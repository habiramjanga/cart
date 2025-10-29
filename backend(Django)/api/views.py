from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Product, CartItem
from .serializers import ProductSerializer, CartItemSerializer
from django.utils import timezone

# 1️⃣ Get all products
@api_view(['GET'])
def get_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET', 'POST'])
def cart_view(request):
    if request.method == 'GET':
        cart_items = CartItem.objects.all()
        serializer = CartItemSerializer(cart_items, many=True)
        total = sum([item.product.price * item.qty for item in cart_items])
        return Response({'cart': serializer.data, 'total': total})

    elif request.method == 'POST':
        product_id = request.data.get('productId')
        qty = int(request.data.get('qty', 1))
        try:
            product = Product.objects.get(id=product_id)
            item, created = CartItem.objects.get_or_create(product=product)
            if not created:
                item.qty += qty
            item.save()
            return Response({'message': 'Item added successfully'})
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

# 4️⃣ Remove item from cart
@api_view(['DELETE'])
def remove_from_cart(request, id):
    try:
        item = CartItem.objects.get(id=id)
        item.delete()
        return Response({'message': 'Item removed successfully'})
    except CartItem.DoesNotExist:
        return Response({'error': 'Item not found'}, status=status.HTTP_404_NOT_FOUND)

# 5️⃣ Checkout
@api_view(['POST'])
def checkout(request):
    cart_items = CartItem.objects.all()
    total = sum([item.product.price * item.qty for item in cart_items])
    timestamp = timezone.now()
    
    # Clear the cart after checkout (optional)
    cart_items.delete()

    return Response({
        'message': 'Checkout successful!',
        'total': total,
        'timestamp': timestamp
    })
