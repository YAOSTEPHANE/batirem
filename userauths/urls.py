from django.urls import path
from userauths.views import (
    register_view,
    login_view,
    logout_view,
    profile_update,
)

app_name = "userauths"

urlpatterns = [
    path("sign-up/", register_view, name="sign_up"),
    path("sign-in/", login_view, name="sign_in"),
    path("sign-out/", logout_view, name="sign_out"),
    path("profile/update/", profile_update, name="profile_update"),
]
