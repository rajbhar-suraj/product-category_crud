const CategoryModel = require("../models/categoryModel");

const createCategory = async (req, res) => {
  try {
    const { category_name } = req.body;
    if (!category_name) {
      return res.status(400).json({ error: "Category name is required" });
    }

    const result = await CategoryModel.insertCategory(category_name);
    res.status(200).json({ message: "Category created", id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { category_name } = req.body;
    const { category_id } = req.params;

    if (!category_name || !category_id) {
      return res
        .status(400)
        .json({ error: "Category name or categoryId is missing" });
    }

    const result = await CategoryModel.updateCategoryById(category_id, category_name);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json({ message: "Category updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { category_id } = req.params;
    if (!category_id) {
      return res.status(400).json({ error: "Category name is required" });
    }

    const result = await CategoryModel.deleteCategoryById(category_id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const showCategory = async (req, res) => {
  try {
    const results = await CategoryModel.getAllCategories();
    if (results.length === 0) {
      return res.status(404).json({ message: "No categories found" });
    }
    res.status(200).json({ categories: results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createCategory, updateCategory, deleteCategory, showCategory };
