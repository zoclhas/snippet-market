from django.urls import path
from .views import views
from .views import product_views as pv

urlpatterns = [
    path("", views.getRoutes, name="get-routes"),

    path("products/", pv.getProducts, name="get-products"),
    path("product/<int:pk>/", pv.getProduct, name="get-product")
]