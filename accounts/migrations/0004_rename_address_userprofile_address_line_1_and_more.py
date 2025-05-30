# Generated by Django 5.1.5 on 2025-05-12 10:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_alter_user_role'),
    ]

    operations = [
        migrations.RenameField(
            model_name='userprofile',
            old_name='address',
            new_name='address_line_1',
        ),
        migrations.AddField(
            model_name='userprofile',
            name='address_line_2',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='role',
            field=models.PositiveSmallIntegerField(blank=True, choices=[(1, 'vendor'), (2, 'Customer')], null=True),
        ),
    ]
