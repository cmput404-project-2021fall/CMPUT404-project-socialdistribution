# Generated by Django 3.2.8 on 2021-12-05 02:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0005_auto_20211205_0214'),
    ]

    operations = [
        migrations.AddField(
            model_name='node',
            name='team_name',
            field=models.CharField(blank=True, max_length=20),
        ),
    ]
