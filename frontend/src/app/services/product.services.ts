import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"

export interface Product {
    product_id?: number,
    product_name: String,
    category_id?: number,
    category_name?:String
}

@Injectable({
    providedIn: 'root',
})

export class ProductService {

    private baseUrl = 'http://localhost:5000/api/products'
    constructor(private http: HttpClient) { }

    getProducts() {
        return this.http.get(`${this.baseUrl}/show`)
    }

    addProducts(body: any) {
        return this.http.post(`${this.baseUrl}/create`, body)
    }

    updateProducts(id: number, body: any) {
        return this.http.put(`${this.baseUrl}/update/${id}`, body)
    }

    deleteProducts(id: number) {
        return this.http.delete(`${this.baseUrl}/delete/${id}`)
    }

    //product-listing-page
    getProductsWithCategories(page: number) {
        return this.http.get(`${this.baseUrl}/getProducts?page=${page}`)
    }
}