# -*- coding: utf-8 -*-
# Generated by Django 1.11.18 on 2020-05-12 19:34
from __future__ import unicode_literals

from django.db import migrations
import django.db.models.manager


class Migration(migrations.Migration):

    dependencies = [
        ('review', '0004_auto_20180501_1654'),
    ]

    operations = [
        migrations.AlterModelManagers(
            name='contentreview',
            managers=[
                ('reviews', django.db.models.manager.Manager()),
            ],
        ),
    ]
