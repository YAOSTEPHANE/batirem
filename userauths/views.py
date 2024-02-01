from django.shortcuts import redirect, render
from userauths.forms import UserRegisterForm
from django.contrib.auth import authenticate, login
from django.contrib import messages
from django.conf import settings


User = settings.AUTH_USER_MODEL

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

def login_view(request):
    if request.user.is_authenticated:
        return redirect('core:index')
    if request.method == "POST":
        email = request.POST.get('email') # batirem@gmail.com
        password = request.POST.get('password') # Yk48976031
        
        try:
          user = User.objects.get(email=email)
         
        except:
            messages.warning(request, f"User {email} n'existe pas")