import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CategoryService, Category } from '../../services/category.services';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-category',
  imports: [ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './category.html',
  styleUrl: './category.css'
})

export class CategoryComponent implements OnInit {
  newCategory: Category = { category_name: '' }
  categories: Category[] = [];
  editingCategory: Category | null = null;


  constructor(private categoryService: CategoryService, private toastr: ToastrService) { }

  loadCategories() {
    this.categoryService.getCategories().subscribe((res: any) => {
      console.log(res.categories)
      this.categories = res.categories;
    });
  }

  startEdit(category: Category) {
    this.editingCategory = { ...category };
  }

  ngOnInit(): void {
    this.loadCategories()
  }

  addCategories() {
    if (!this.newCategory.category_name) {
      this.toastr.warning("Cannot be empty")
      return
    }
    this.categoryService.createCategory(this.newCategory).subscribe(() => {
      this.newCategory = { category_name: "" }
      this.toastr.success("Category added successfully")
      this.loadCategories()
    })
  }

  updateCategory() {

    if (!this.editingCategory?.category_name) {
      this.toastr.warning("Cannot be empty")
      return
    }
    this.categoryService.updateCategory(this.editingCategory.category_id!, this.editingCategory).subscribe(() => {
      this.editingCategory = null;
      this.toastr.success("Category updated successfully")

      this.loadCategories();
    })
  }

  cancelEdit() {
    this.editingCategory = null;
  }
  confirmDelete(id: number) {
    if (confirm("Are you sure you want to delete this category?")) {
      this.deleteCategory(id);
    }
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe(() => {
      this.toastr.success("Category deleted successfully")
      this.loadCategories()
    })
  }
}
