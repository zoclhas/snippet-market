from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from base.models import Product
from base.serializers import ProductSerializer

@api_view(["GET"])
def getProducts(request):
    page = request.query_params.get("page")
    query = request.query_params.get("query")
    if (query == None):
        query = ''
    if (page == None):
        page = 1
    else:
        page = int(page)

    products = Product.objects.filter(name__icontains=query).order_by("-id")

    paginator = Paginator(products, 8)
    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    serializer = ProductSerializer(products, many=True)
    return Response(
        {
            "products": serializer.data,
            "page": page,
            "pages": paginator.num_pages,
        }
    )

@api_view(["GET"])
def getProduct(request, pk):
    product = Product.objects.get(id=pk)

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(["POST"])
@permission_classes([IsAdminUser])
def createProduct(request):
    product = Product.objects.create(
        user = request.user,
        name = "Sample Product",
        description = "Sample Description",
        price = 0,
        old_price = None,
        count_in_stock = 0,
    )
    product.save()

    serilizer = ProductSerializer(product, many=False)
    return Response(serilizer.data)

@api_view(["POST"])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(id=pk)
    product.delete()
    return Response('Product deleted.')

@api_view(["PUT"])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data
    product = Product.objects.get(id=pk)

    product.name = data["name"]
    product.description = data["description"]
    product.price = data["price"]
    product.old_price = data["old_price"]
    product.count_in_stock = data["stock"]
    product.save()

    serialzier = ProductSerializer(product, many=False)
    return Response(serialzier.data)

@api_view(["POST"])
@permission_classes([IsAdminUser])
def uploadProductImage(request):
    data = request.data

    product = Product.objects.get(id = data["product_id"])
    product.image = request.FILES.get("image")
    product.save()

    return Response("Image uploaded.")