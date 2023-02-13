from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from . import models as m

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.Product
        fields = "__all__"