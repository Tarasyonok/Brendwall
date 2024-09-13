from products import views

from django.urls import path

app_name = "products"
urlpatterns = [
    path("api/", views.products_api, name="products_api"),
    path("", views.add_product, name="add_product"),
]
