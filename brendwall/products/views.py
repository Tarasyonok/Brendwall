from django.http import JsonResponse

from products.models import Product


def products_api(request):
    return JsonResponse(list(Product.objects.all().values()), safe=False)
