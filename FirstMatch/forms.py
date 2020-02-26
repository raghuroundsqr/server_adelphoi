from django.forms import ModelForm
from .models import TestModels,ModelTest,ModelTests
from django import forms
from django.http import HttpResponse
from django.core import validators


class TestForms(forms.ModelForm):
    class Meta:
        model = TestModels
        fields = "__all__"
    # def clean(self):
    #     cleaned_data = super().clean()
    #     Client_code = cleaned_data['Client_code']
    #
    #     query= TestModels.objects.filter(Client_code=Client_code)#.values()
    #     if query.count() > 0:
    #         raise forms.ValidationError("VALIDATION SUCCESS!")
    #     else:
    #         raise forms.ValidationError("Validation is not done")

class TestForms2(forms.ModelForm):
    class Meta:
        model = TestModels
        fields = "__all__"
    def clean(self):
        cleaned_data = super().clean()
        Client_code = cleaned_data['Client_code']

        query= TestModels.objects.filter(Client_code=Client_code)#.values()
        if query.count() > 0:
            raise forms.ValidationError("VALIDATION SUCCESS!")
        else:
            raise forms.ValidationError("Validation is not done")

class ModelTestForms(forms.ModelForm):
    class Meta:
        model = ModelTests
        # fields = "__all__"

        exclude = ['modified_date','program','confidence','level_of_care'] #,'hist_of_prior_program_SAO'
    # def save(self,program=None):
    #     first_info = super(ModelTestForms,self).save(commit=False)
    #     if program:
    #         first_info.program = program