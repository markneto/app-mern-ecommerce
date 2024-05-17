import express from "express";
import Product from "../Models/products.js";
const router = express.Router();

// Create a new product
router.post("/create", async (req, res) => {
  const newProduct = new Product({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    discountPercentage: req.body.discountPercentage,
    rating: req.body.rating,
    stock: req.body.stock,
    brand: req.body.brand,
    category: req.body.category,
    thumbnail: req.body.thumbnail,
  });
  try {
    const savedProduct = await newProduct.save();
    res.json(savedProduct);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get a product by id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Update a product
router.put("/update/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete a product
router.delete("/delete/:id", async (req, res) => {
  try {
    const removedProduct = await Product.findByIdAndRemove(req.params.id);
    res.json({ message: "Product deleted!" });
  } catch (err) {
    res.status(400).send(err);
  }
});

export default router;
