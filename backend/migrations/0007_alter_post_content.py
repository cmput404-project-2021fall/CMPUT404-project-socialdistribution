# Generated by Django 3.2.8 on 2021-12-05 03:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0006_node_team_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='content',
            field=models.TextField(blank=True, null=True),
        ),
    ]
