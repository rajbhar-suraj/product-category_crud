**High‑Level Summary of the *product‑category_crud* Repository**

---

How to Run the Project

Backend-
Copy .env (already present or create one) and ensure MySQL DB nimap exists with tables categories and products.
cd backend && npm install
npm start (runs with nodemon on PORT from .env, default 5000)

Frontend-
cd frontend && npm install
npm start – launches Angular dev server (default http://localhost:4200).
The frontend expects the backend at http://localhost:5000/api; adjust CategoryService and ProductService base URLs if needed.

### Purpose
This repository implements a simple CRUD (Create‑Read‑Update‑Delete) application for managing **product categories** and **products**. It consists of a **Node.js/Express** backend API backed by a MySQL database and an **Angular** frontend UI that consumes the API.

---

### Main Components

| Layer | Technology | Key Features |
|-------|------------|--------------|
| **Backend** | Node.js, Express, MySQL (via `mysql2`), `dotenv` for env vars | • REST endpoints for categories (`/categories/*`) and products (`/products/*`).<br>• Database connection handling in `src/config/db.js`.<br>• Controllers (`categoryController.js`, `productController.js`) implement business logic (create, read, update, delete).<br>• Model layer (`categoryModel.js`, `productModel.js`) abstracts SQL queries and returns promises.<br>• Pagination support for product listing (`getPaginatedProducts`). |
| **Frontend** | Angular 20, TypeScript, Tailwind CSS, ngx‑toastr | • Routing: `/addCategory`, `/addProduct`, `/products` (list).<br>• UI components: **Header**, **Category**, **Product**, **Product‑List‑Component**.<br>• Services (`category.services.ts`, `product.services.ts`) encapsulate HTTP calls to the backend.<br>• Reactive forms for adding/editing items.<br>• Toast notifications for success/failure feedback.<br>• Pagination UI for product list. |
| **Configuration** | `.env` (backend), `angular.json`, `tsconfig*.json`, various `.gitignore` files | • Backend reads DB credentials & server port from `.env`.<br>• Angular CLI configuration for building, serving, and testing.<br>• Tailwind CSS integration via PostCSS. |

---

### Directory Layout

```
├── backend
│   ├── .env               # DB credentials & server port
│   ├── package.json       # Node dependencies (express, cors, dotenv, mysql2)
│   └── src
│       ├── config/db.js   # MySQL connection setup
│       ├── controllers
│       │   ├── categoryController.js
│       │   └── productController.js
│       ├── models
│       │   ├── categoryModel.js
│       │   └── productModel.js
│       ├── routes/index.js   # API route definitions
│       └── index.js          # Express app bootstrap
└── frontend
    ├── angular.json
    ├── package.json          # Angular dependencies (ngx-toastr, tailwindcss, etc.)
    └── src
        ├── app
        │   ├── app.config.ts      # Global providers (router, HttpClient, Toastr, animations)
        │   ├── app.routes.ts      # Angular routes
        │   ├── components
        │   │   ├── header
        │   │   │   └── header.{html,ts,css}
        │   │   ├── category
        │   │   │   └── category.{html,ts,css}
        │   │   ├── product
        │   │   │   └── product.{html,ts,css}
        │   │   └── product-list-component
        │   │       └── product-list-component.{html,ts,css}
        │   └── services
        │       ├── category.services.ts
        │       └── product.services.ts
        ├── index.html
        ├── main.ts
        └── styles.css            # Global Tailwind import
```

---

### Backend API Overview

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/categories/show` | GET | Return all categories. |
| `/api/categories/create` | POST | Create a new category (`category_name`). |
| `/api/categories/update/:category_id` | PUT | Update a category’s name. |
| `/api/categories/delete/:category_id` | DELETE | Delete a category. |
| `/api/products/show` | GET | Return all products. |
| `/api/products/create` | POST | Create a new product (`product_name`, `category_id`). |
| `/api/products/update/:product_id` | PUT | Update product details. |
| `/api/products/delete/:product_id` | DELETE | Delete a product. |
| `/api/products/getProducts?page=n` | GET | Paginated product list with joined category data. |

All routes are prefixed with `/api` and are mounted in `backend/src/routes/index.js`.

---

### Frontend Functionality

* **Header** – Navigation bar linking to product list, add‑category, and add‑product pages.
* **Category Component** – Form to add a new category, list existing categories, edit inline, and delete.
* **Product Component** – Similar CRUD UI for products, including a dropdown of existing categories.
* **Product‑List Component** – Displays a table of products with their category names and paginated navigation.
* **Services** – Use Angular’s `HttpClient` to call the backend endpoints; error handling is left to the component level (e.g., toast messages).
* **Styling** – Tailwind CSS utilities plus a few custom CSS files.

---

### How to Run the Project

1. **Backend**
   * Copy `.env` (already present) and ensure MySQL DB `nimap` exists with tables `categories` and `products`.
   * `cd backend && npm install`
   * `npm start` (runs with `nodemon` on `PORT` from `.env`, default 5000)

2. **Frontend**
   * `cd frontend && npm install`
   * `npm start` – launches Angular dev server (default `http://localhost:4200`).

The frontend expects the backend at `http://localhost:5000/api`; adjust `CategoryService` and `ProductService` base URLs if needed.

---

### Notable Points / Potential Improvements

* **Error handling** – Controllers return generic error messages; could be standardized.
* **Validation** – Basic presence checks are performed; more thorough schema validation (e.g., using `joi`) would be beneficial.
* **Security** – No authentication/authorization; adding JWT or session management would be needed for production.
* **Database migrations** – Currently there are no migration scripts; using a tool like `knex` or `sequelize` would help manage schema changes.
* **Frontend pagination** – The UI calculates page count from the returned array length; the backend could return total count and page metadata for more accurate pagination.

---

**In short**, this repo provides a straightforward full‑stack example of managing categories and products, illustrating the typical separation of concerns (REST API + Angular UI) and serving as a solid foundation for extending functionality, adding security, or integrating more sophisticated UI/UX features.

