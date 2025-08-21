import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../../services/product.services';
import { ToastrService } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Category, CategoryService } from '../../services/category.services';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-product',
  imports: [FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './product.html',
  styleUrl: './product.css'
})
export class ProductComponent implements OnInit {
  inventory: Product[] = [];
  categories: Category[] = [];
  newProducts: Product = { product_id: 0, product_name: "", category_id: 0 }
  editingProduct: Product | null = null;
  totalPages: number[] = [];

  constructor(private products: ProductService, private category: CategoryService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadProducts()
  }

  loadProducts(page: number = 1) {
    this.products.getProducts().subscribe((res: any) => {
      let total = res.products.length / 10
      let pages = Math.ceil(total);
      this.totalPages = Array.from({ length: pages }, (_, i) => i + 1);

    })
    this.products.getProductsWithCategories(page).subscribe((res: any) => {
      console.log("loading the products", res.products)
      this.inventory = res.products
    })
    this.category.getCategories().subscribe((res: any) => {
      console.log("loading the categories", res)
      this.categories = res.categories
    })
  }

  createProduct() {
    if (!this.newProducts?.product_name || !this.newProducts.category_id) {
      this.toastr.warning("Cannot be empty")
      return
    } this.products.addProducts(this.newProducts).subscribe(() => {
      this.toastr.success("Product created successfully")
      this.newProducts = { product_id: 0, product_name: "", category_id: 0 }
      this.loadProducts()
    })
  }

  startEdit(product: Product) {
    this.editingProduct = { ...product }
  }

  updateProduct() {
    if (!this.editingProduct?.product_name || !this.editingProduct?.category_name) {
      this.toastr.warning("Cannot be empty")
      return
    }
    console.log("this.editingProduct", this.editingProduct)
    this.products.updateProducts(this.editingProduct.product_id!, this.editingProduct).subscribe(() => {
      this.editingProduct = null;
      this.toastr.success("Product updated successfully")

      this.loadProducts();
    })
  }
  cancelEdit() {
    this.editingProduct = null;
  }


  confirmDelete(id: number) {
    if (confirm("Are you sure you want to delete this Product?")) {
      this.deleteProduct(id);
    }
  }

  deleteProduct(product_id: number) {
    this.products.deleteProducts(product_id).subscribe(() => {
      this.toastr.success("Product deleted successfully")
      this.loadProducts()
    })
  }
}
