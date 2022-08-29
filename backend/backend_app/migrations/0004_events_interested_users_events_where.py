# Generated by Django 4.1 on 2022-08-29 00:42

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend_app', '0003_alter_events_related_links'),
    ]

    operations = [
        migrations.AddField(
            model_name='events',
            name='interested_users',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=200), null=True, size=None),
        ),
        migrations.AddField(
            model_name='events',
            name='where',
            field=models.TextField(default=1),
            preserve_default=False,
        ),
    ]
