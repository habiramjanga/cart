from django.urls import path
from . import views

urlpatterns = [
    path('products/', views.get_products),
    path('cart/', views.cart_view),  # GET + POST handled here
    path('cart/<int:id>/', views.remove_from_cart),
    path('checkout/', views.checkout),
]

