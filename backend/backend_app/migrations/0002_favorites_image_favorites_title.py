# Generated by Django 4.1 on 2022-08-26 15:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='favorites',
            name='image',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='favorites',
            name='title',
            field=models.CharField(default='hi', max_length=100),
            preserve_default=False,
        ),
    ]
