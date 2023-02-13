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