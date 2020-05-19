from orb.models import Tag


def tags_by_category(request):
    """Returns strings of tag names by defined category"""
    return {
        "tags_by_category": {
            category: ", ".join(['"{}"'.format(t) for t in Tag.tags.by_category(category).names()])
            for category in [
                "organisation",
                "language",
                "geography",
                "other",
            ]
        }
    }
