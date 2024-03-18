from django.urls import path
from useradmin import views

app_name = "useradmin"

urlpatterns = [
    path("dashboard/", views.dashboard, name="dashboard"),
    path("dashboard/products/", views.dashboard_products, name="dashboard-products"),
    path("dashboard/add-products/", views.dashboard_add_product, name="dashboard-add-products"),
    path("dashboard/edit-products/<int:pid>/", views.dashboard_edit_product, name="dashboard-edit-products"),
    path("dashboard/delete-products/<int:pid>/", views.dashboard_delete_product, name="dashboard-delete-products"),
]

