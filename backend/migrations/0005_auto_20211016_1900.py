# Generated by Django 3.2.8 on 2021-10-16 19:00

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0004_auto_20211016_1856'),
    ]

    operations = [
        migrations.AlterField(
            model_name='author',
            name='id',
            field=models.UUIDField(default=uuid.uuid1, editable=False, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='comment',
            name='id',
            field=models.UUIDField(default=uuid.uuid1, editable=False, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='post',
            name='id',
            field=models.UUIDField(default=uuid.uuid1, editable=False, primary_key=True, serialize=False),
        ),
    ]
