from django import forms
from django.contrib.auth.forms import UserCreationForm
from userauths.models import User


class UserRegisterForm(UserCreationForm):
    username = forms.CharField(widget=forms.TextInput(
        attrs={'placeholder': 'Nom Utilisateur'}))
    email = forms.EmailField(widget=forms.TextInput(
        attrs={'placeholder': 'Email'}))
    password1 = forms.CharField(widget=forms.PasswordInput(
        attrs={'placeholder': 'Mot de passe'}))
    password2 = forms.CharField(widget=forms.PasswordInput(
        attrs={'placeholder': 'Confirmer le mot de passe'}))
    
    class Meta:
        model = User
        fields = ['username', 'email']
