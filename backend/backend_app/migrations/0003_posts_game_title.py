# Generated by Django 4.1 on 2022-08-29 20:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend_app', '0002_favorites_date_posted'),
    ]

    operations = [
        migrations.AddField(
            model_name='posts',
            name='game_title',
            field=models.CharField(default='Madden 22', max_length=100),
            preserve_default=False,
        ),
    ]
