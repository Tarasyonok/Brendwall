from django.core.validators import MinValueValidator
from django.db import models


class Product(models.Model):
    id = models.BigAutoField("id", primary_key=True)
    name = models.CharField("Название", max_length=255, null=False, blank=False)
    description = models.TextField("Описание", null=True, blank=True)
    price = models.IntegerField("Цена", validators=[MinValueValidator(1)], null=False, blank=False)

    class Meta:
        db_table = "products"
