const db = require("../config/db");

// promisify query
const query = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

// Model functions
const findCategoryById = (category_id) => {
  return query("SELECT * FROM categories WHERE category_id = ?", [category_id]);
};

const insertProduct = (product_name, category_id) => {
  return query("INSERT INTO products (product_name, category_id) VALUES (?, ?)", [
    product_name,
    category_id,
  ]);
};

const updateProductById = (product_id, product_name, category_id) => {
  return query(
    "UPDATE products SET product_name = ?, category_id = ? WHERE product_id = ?",
    [product_name, category_id, product_id]
  );
};

const deleteProductById = (product_id) => {
  return query("DELETE FROM products WHERE product_id = ?", [product_id]);
};

const getAllProducts = () => {
  return query("SELECT * FROM products");
};

const getPaginatedProducts = (limit, offset) => {
  const sql = `
    SELECT p.product_id, p.product_name, c.category_id, c.category_name
    FROM products p
    JOIN categories c ON p.category_id = c.category_id
    ORDER BY p.product_id ASC
    LIMIT ? OFFSET ?`;
  return query(sql, [limit, offset]);
};

module.exports = {
  findCategoryById,
  insertProduct,
  updateProductById,
  deleteProductById,
  getAllProducts,
  getPaginatedProducts,
};
