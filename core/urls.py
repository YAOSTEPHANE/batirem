from django.urls import path
from core.views import index
from core import views


app_name = "core"

urlpatterns = [
    path("", index, name="index"),
]