import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.services';

@Component({
  selector: 'app-product-list-component',
  imports: [
    CommonModule
  ],
  templateUrl: './product-list-component.html',
  styleUrl: './product-list-component.css'
})
export class ProductListComponent implements OnInit {
  products: any = []
  totalPages: number[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts()
  }


  loadProducts(page: number = 1) {
    this.productService.getProducts().subscribe((res: any) => {
      console.log(res)
      let pages = res.products.length / 10
      this.totalPages = Array.from({ length: pages }, (_, i) => i + 1);
    })
    this.productService.getProductsWithCategories(page).subscribe((res: any) => {
      this.products = res.products
    })

  }
}
