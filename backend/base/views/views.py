from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# Create your views here.

@api_view(["GET"])
def getRoutes(request):
    routes = [
        "products/",
        "products/<int:id>",
    ]

    return Response(routes)