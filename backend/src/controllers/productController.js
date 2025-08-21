const ProductModel = require("../models/productModel");

const createProduct = async (req, res) => {
  try {
    const { product_name, category_id } = req.body;
    if (!category_id || !product_name) {
      return res.status(400).json({ error: "product name or categoryId is missing" });
    }

    const category = await ProductModel.findCategoryById(category_id);
    if (category.length === 0) {
      return res.status(400).json({ error: "Category doesn't exists" });
    }

    const result = await ProductModel.insertProduct(product_name, category_id);
    res.status(200).json({ message: "Product created", id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { product_name, category_id } = req.body;
    const { product_id } = req.params;

    if (!category_id || !product_name ) {
      return res.status(400).json({ error: "product name or categoryId is missing" });
    }

    const category = await ProductModel.findCategoryById(category_id);
    if (category.length === 0) {
      return res.status(400).json({ error: "Category doesn't exists" });
    }

    const result = await ProductModel.updateProductById(product_id, product_name, category_id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { product_id } = req.params;
    if (!product_id) {
      return res.status(400).json({ error: "productId is required" });
    }

    const result = await ProductModel.deleteProductById(product_id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "product not found" });
    }

    res.status(200).json({ message: "product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const showProducts = async (req, res) => {
  try {
    const results = await ProductModel.getAllProducts();
    if (results.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    res.status(200).json({ products: results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * limit;

    const results = await ProductModel.getPaginatedProducts(limit, offset);
    res.json({ page, limit, products: results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getProducts, createProduct, updateProduct, deleteProduct, showProducts };
