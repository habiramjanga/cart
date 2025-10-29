import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`)))
  .catch((err) => console.error("MongoDB connection error:", err));
