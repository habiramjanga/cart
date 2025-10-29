from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return self.name

class CartItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    qty = models.PositiveIntegerField(default=1)

    def subtotal(self):
        return self.product.price * self.qty
