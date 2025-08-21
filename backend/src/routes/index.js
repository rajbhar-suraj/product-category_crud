const express = require("express");
const { createCategory,updateCategory,deleteCategory,showCategory } = require("../controllers/categoryController");
const { createProduct, showProducts, updateProduct, deleteProduct, getProducts } = require("../controllers/productController");
const router = express.Router();

//category_master
router.get("/categories/show", showCategory);
router.post("/categories/create", createCategory);
router.put("/categories/update/:category_id", updateCategory);
router.delete("/categories/delete/:category_id", deleteCategory);


//product_master
router.get("/products/show", showProducts);
router.post("/products/create", createProduct);
router.put("/products/update/:product_id", updateProduct);
router.delete("/products/delete/:product_id", deleteProduct);


//product list - pagination
router.get("/products/getProducts",getProducts)
module.exports = router;