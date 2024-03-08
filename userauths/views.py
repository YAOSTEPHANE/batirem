from django.shortcuts import redirect, render
from userauths.forms import UserRegisterForm
from django.contrib.auth import login, authenticate, logout
from django.contrib import messages
from django.conf import settings


User = settings.AUTH_USER_MODEL


def register_view(request):
    
    if request.method == "POST":
        form = UserRegisterForm(request.POST or None)
        if form.is_valid():
            new_user = form.save()
            username = form.cleaned_data.get("nom utilisateur")
            messages.success(request, f"Hey {username}, Ton compte a été crée avec succes.")
            new_user = authenticate(username=form.cleaned_data['email'],
                                    password=form.cleaned_data['password1']
            )
            login(request, new_user)
            return redirect("core:index")
    else:
        form = UserRegisterForm()


    context = {
        'form': form,
    }
    return render(request, "userauths/sign-up.html", context)


def login_view(request):
    if request.user.is_authenticated:
        messages.warning(request, f"Hé vous etes deja connecté.")
        return redirect("core:index")
    
    if request.method == "POST":
        email = request.POST.get("email") # peanuts@gmail.com
        password = request.POST.get("password") # getmepeanuts

        try:
            user = User.objects.get(email=email)
            user = authenticate(request, email=email, password=password)

            if user is not None:
                login(request, user)
                messages.success(request, "Vous etes connecté.")
                return redirect("core:index")
            else:
                messages.warning(request, "L'utilisateur n'existe pas creer un compte.")
    
        except:
            messages.warning(request, f"Utilisateur avec {email} n'existe pas")
        

    
    return render(request, "userauths/sign-in.html")

        

def logout_view(request):

    logout(request)
    messages.success(request, "Vous etes deconnecté.")
    return redirect("userauths:sign-in")
