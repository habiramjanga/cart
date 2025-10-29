import Product from "../models/productModel.js";

// GET /api/products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/products
export const addProduct = async (req, res) => {
  try {
    const { name, price } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Name and price are required" });
    }

    const newProduct = new Product({ name, price });
    await newProduct.save();

    res.status(201).json({
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

