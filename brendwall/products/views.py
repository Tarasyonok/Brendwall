from django.http import JsonResponse

from products.models import Product
from products.forms import ProductForm


def products_api(request):
    if request.method == "POST":
        form = ProductForm(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse({"message": f'Продукт "{request.POST["name"]}" добавлен'}, status=200)
        else:
            return JsonResponse({"message": "Форма заполнена некорректно"}, status=400)

    else:
        return JsonResponse(list(Product.objects.all().values()), safe=False)
