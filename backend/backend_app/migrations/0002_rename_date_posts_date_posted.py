# Generated by Django 4.1 on 2022-08-28 23:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend_app', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='posts',
            old_name='date',
            new_name='date_posted',
        ),
    ]
