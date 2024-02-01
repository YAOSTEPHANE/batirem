from django.shortcuts import redirect, render
from userauths.forms import UserRegisterForm
from django.contrib.auth import authenticate, login
from django.contrib import messages

def register_view(request):
    
    if request.method == "POST":
        form = UserRegisterForm(request.POST or None)
        if form.is_valid():
            new_user = form.save()
            username = form.cleaned_data.get('username')
            messages.success(request, f"Hé {username}, Votre compte a été créé avec succès.")
            new_user = authenticate(username=form.cleaned_data['email'],
                                    password=form.cleaned_data['password1'],
                                    )
            login(request, new_user)
            return redirect('core:index')
            
    else:
        print("Utilisateur non enregistré")
        form = UserRegisterForm()
    
    context = {
        'form': form,
    }
    return render(request, 'userauths/sign-up.html', context)