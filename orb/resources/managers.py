"""
Manager classes for resource-related models
"""

from django.contrib.auth.models import AnonymousUser
from django.db import models
from django.conf import settings
from django.db.models import Count, Max, Min, Q, Avg, Case, When, Value


def approved_queryset(queryset, user=AnonymousUser, status="approved", relation=""):
    """
    Filters the given queryset based on the allowed status and user

    This function is intended to be used via the interface of a Manager method

    Args:
        queryset: the initial queryset
        user: the accessing User
        status: string matching the required status level
        relation: a string describing a Django ORM relation lookup for filtering
                objects that are related to Resources. By defaul this will search
                against Resources directly

    Returns:
        QuerySet: A queryset filtered by status and/or user

    """
    status_filter = {"{0}status".format(relation): status}
    creator_filter = {"{0}create_user".format(relation): user}
    updater_filter = {"{0}update_user".format(relation): user}

    if not user.is_authenticated():
        return queryset.filter(**status_filter)
    if user.is_staff:
        return queryset
    try:
        if user.userprofile.is_reviewer:
            return queryset
    except AttributeError:
        pass

    return queryset.filter(
        models.Q(**status_filter) |
        models.Q(**creator_filter) |
        models.Q(**updater_filter)
    )


class ResourceQueryset(models.QuerySet):

    def approved(self, user=None):
        """
        Queryset that includes only resources viewable by given user
        based on approval state.

        Args:
            user (auth.User): the user to check 'permission' against

        Returns:
            QuerySet: A queryset filtered by status and/or user

        """
        if user is None:
            user = AnonymousUser()
        return approved_queryset(self, user)

    def pending(self):
        return self.exclude(
            models.Q(status="approved") |
            models.Q(status="rejected")
        )

    def for_tag(self, tag):
        return self.filter(resourcetag__tag=tag)

    def with_ratings(self, tag):
        """
        Adds annotations f

        Orders first by whether this exceeds the minimum
        """
        return self.for_tag(tag).annotate(
            rating=Avg('resourcerating__rating'),
            rate_count=Count('resourcerating'),
        ).annotate(
            exceeds_minimum=Case(
                When(rate_count__gte=settings.ORB_RESOURCE_MIN_RATINGS, then=Value(True)),
                default=Value(False),
                output_field=models.BooleanField(),
            ),
        ).order_by('exceeds_minimum')

    def search(self, search_form_data):
        """
        
        Args:
            search_form_data: a dictionary of cleaned field data

        Returns:

        """
        from orb.models import Tag
        qs = self.all()
        for field_name in ['health_topic', 'resource_type', 'audience', 'geography', 'language', 'device']:
            if search_form_data.get(field_name):
                qs = qs.filter(tags__in=search_form_data[field_name])

        if search_form_data.get('licenses'):
            license_tags = Tag.tags.filter(
                properties__name="feature:shortname", properties__value__in=search_form_data['license'])
            qs.exclude(tags__in=license_tags)

        return qs.distinct()


class ResourceURLManager(models.Manager):

    def approved(self, user=None):
        """
        Queryset that includes only resource URLs viewable by given user
        based on approval state.

        Args:
            user (auth.User): the user to check 'permission' against

        Returns:
            QuerySet: A queryset filtered by status and/or user

        """
        qs = super(ResourceURLManager, self).get_queryset()
        if user is None:
            user = AnonymousUser()
        return approved_queryset(qs, user, relation="resource__")
