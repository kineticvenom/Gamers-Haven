# Generated by Django 4.1 on 2022-08-24 23:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend_app', '0005_alter_posts_user'),
    ]

    operations = [
        migrations.RenameField(
            model_name='posts',
            old_name='user',
            new_name='user_username',
        ),
    ]
