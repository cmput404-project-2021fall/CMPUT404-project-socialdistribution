# Generated by Django 3.2.8 on 2021-11-24 01:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_node_requesting_auth_info'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='origin',
            field=models.URLField(default='http://127.0.0.1:8000/', max_length=500),
        ),
        migrations.AlterField(
            model_name='post',
            name='source',
            field=models.URLField(default='http://127.0.0.1:8000/', max_length=500),
        ),
    ]
