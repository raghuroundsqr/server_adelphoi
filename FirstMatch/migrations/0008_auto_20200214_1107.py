# Generated by Django 2.2.7 on 2020-02-14 11:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('FirstMatch', '0007_remove_modeltests_primaryracecode'),
    ]

    operations = [
        migrations.AddField(
            model_name='modeltests',
            name='program_significantly_modified',
            field=models.IntegerField(choices=[(0, 'no'), (1, 'yes')], db_column='program_significantly_modified', null=True),
        ),
        migrations.AlterField(
            model_name='modeltests',
            name='Program_Completion',
            field=models.IntegerField(choices=[(0, 'no'), (1, 'yes')], db_column='Program Completion', null=True),
        ),
        migrations.AlterField(
            model_name='modeltests',
            name='Returned_to_Care',
            field=models.IntegerField(choices=[(0, 'no'), (1, 'yes')], db_column='Returned_to_Care', null=True),
        ),
        migrations.AlterField(
            model_name='modeltests',
            name='referred_program',
            field=models.CharField(choices=[('ISM', 'ISM'), ('ISF', 'ISF'), ('MHFO', 'MHFO'), ('SUBAB', 'SUBAB'), ('SEXOF-MH', 'SEXOF-MH'), ('SEXOF-SECURE', 'SEXOF-SECURE'), ('SEXOF', 'SEXOF'), ('SECURE-MALE', 'SECURE-MALE'), ('SECURE-FEMALE', 'SECURE-FEMALE'), ('INDEPENDENT LIVING', 'Independent Living'), ('Transitional Living', 'Transitional Living')], db_column='referred_program', max_length=100),
        ),
    ]
