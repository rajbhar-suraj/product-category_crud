import { Routes } from '@angular/router';
import { ProductComponent } from './components/product/product';
import { CategoryComponent } from './components/category/category';
import { ProductListComponent } from './components/product-list-component/product-list-component';

export const routes: Routes = [
    {
        path: 'addCategory',
        component: CategoryComponent
    },
    {
        path: 'addProduct',
        component: ProductComponent
    },
    { path: 'products', component: ProductListComponent },
    { path: '', redirectTo: '/products', pathMatch: 'full' },
];
