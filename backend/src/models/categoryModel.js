const db = require("../config/db");

const query = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

const insertCategory = (category_name) => {
  return query("INSERT INTO categories (category_name) VALUES (?)", [category_name]);
};

const updateCategoryById = (category_id, category_name) => {
  return query("UPDATE categories SET category_name = ? WHERE category_id = ?", [
    category_name,
    category_id,
  ]);
};

const deleteCategoryById = (category_id) => {
  return query("DELETE FROM categories WHERE category_id = ?", [category_id]);
};

const getAllCategories = () => {
  return query("SELECT * FROM categories");
};

module.exports = {
  insertCategory,
  updateCategoryById,
  deleteCategoryById,
  getAllCategories,
};
