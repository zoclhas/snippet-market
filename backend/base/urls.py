from django.urls import path
from .views import views

urlpatterns = [
    path("", views.getRoutes, name="get-routes"),
]