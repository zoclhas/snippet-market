from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from rest_framework.permissions import IsAdminUser, IsAuthenticated
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from base.serializers import OrderSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from base.models import Order, ShippingAddress, Product, OrderItem

from rest_framework import status

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data
    order_items = data["orderItems"]

    if (order_items and (len(order_items) == 0)):
        return Response({"detail": "No order items."}, status = status.HTTP_400_BAD_REQUEST)
    else: 
        order = Order.objects.create(
            user = user,
            payment_method = data["paymentMethod"],
            tax_price = data["taxPrice"],
            total_price = data["totalPrice"],

        )

        shipping = ShippingAddress.objects.create(
            order = order,
            location = data["shippingAddress"]["location"],
            grade = data["shippingAddress"]["grade"],
        )

        for i in order_items:
            product = Product.objects.get(id=i["product"])

            item = OrderItem.objects.create(
                product = product,
                order = order,
                name = product.name,
                qty = i["qty"],
                price = i["price"],
                image = product.image.url,
            )

            product.count_in_stock -= int(item.qty)
            product.save()

    serializer = OrderSerializer(order, many=False)
    return Response(serializer.data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getOrderByID(request, pk):
    user = request.user

    try:
        order = Order.objects.get(id=pk)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            return Response({"detail": "Not authorized to view this order."}, status = status.HTTP_401_UNAUTHORIZED)
    except:
        return Response({"detail": "Order doesn't exist."}, status = status.HTTP_404_NOT_FOUND)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def cancelOrder(request, pk):
    user = request.user

    try:
        order = Order.objects.get(id=pk)
        if user.is_staff or order.user == user:
            data = bool(request.data["cancelled"])
            order.cancelled = data
            order.save()

            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            return Response({"detail": "Not authorized to cancel this order."}, status = status.HTTP_401_UNAUTHORIZED)
    except:
        return Response({"detail": "Order doesn't exist."}, status = status.HTTP_404_NOT_FOUND)