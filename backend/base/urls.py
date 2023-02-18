from django.urls import path
from .views import views
from .views import product_views as pv
from .views import user_views as uv

urlpatterns = [
    path("", views.getRoutes, name="get-routes"),

    path("products/", pv.getProducts, name="get-products"),
    path("product/<int:pk>/", pv.getProduct, name="get-product"),
    path("product/create/", pv.createProduct, name="create-product"),
    path("product/delete/<int:pk>", pv.deleteProduct, name="delete-product"),
    path("product/update/<int:pk>", pv.updateProduct, name="update-product"),
    path("product/upload/", pv.uploadProductImage, name="upload-product-image"),

    path("users/login/", uv.MyTokenObtainPairView.as_view(), name="token-obtain-pair"),
    path("users/register/", uv.registerUser, name="register-user"),

    path("users/", uv.getUsers, name="get-users"),
    path("users/profile/", uv.getUserProfile, name="get-user-profile"),
    path("users/profile/update/", uv.updateUserProfile, name="update-user-profile"),
]