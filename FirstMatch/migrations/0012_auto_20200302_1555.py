# Generated by Django 2.2.7 on 2020-03-02 10:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('FirstMatch', '0011_referralsource'),
    ]

    operations = [
        migrations.AddField(
            model_name='modeltests',
            name='roc_confidence',
            field=models.IntegerField(db_column='roc_confidence', default=1),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='modeltests',
            name='RefSourceCode',
            field=models.IntegerField(db_column='RefSourceCode'),
        ),
    ]
