# Generated by Django 4.1.6 on 2023-02-20 10:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0006_order_delivery_eta'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='cancelled',
            field=models.BooleanField(default=False),
        ),
    ]