import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

// GET /api/cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.find().populate("productId");
    const total = cart.reduce((sum, item) => sum + item.productId.price * item.qty, 0);
    res.json({ items: cart, total });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/cart
export const addToCart = async (req, res) => {
  try {
    const { productId, qty } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const cartItem = await Cart.findOne({ productId });
    if (cartItem) {
      cartItem.qty += qty;
      await cartItem.save();
      return res.json(cartItem);
    }

    const newItem = await Cart.create({ productId, qty });
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/cart/:id
export const removeFromCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: "Item removed from cart" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/checkout
export const checkout = async (req, res) => {
  try {
    const { cartItems } = req.body;
    const total = cartItems.reduce((sum, item) => sum + item.productId.price * item.qty, 0);
    const timestamp = new Date();

    await Cart.deleteMany(); // clear cart after checkout

    res.json({
      message: "Checkout successful",
      total,
      timestamp,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
