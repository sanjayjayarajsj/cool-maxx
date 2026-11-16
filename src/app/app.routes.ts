// src/app/app.routes.ts  – every page is lazy-loaded (smaller first download)
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', title: 'COOL MAXX | AC Spare Parts', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
  { path: 'products', title: 'Products | COOL MAXX', loadComponent: () => import('./products/products.component').then(m => m.ProductsComponent) },
  { path: 'products/:id', title: 'Product | COOL MAXX', loadComponent: () => import('./product-details/product-details.component').then(m => m.ProductDetailsComponent) },
  { path: 'about', title: 'About | COOL MAXX', loadComponent: () => import('./about/about.component').then(m => m.AboutComponent) },
  { path: 'contact', title: 'Contact | COOL MAXX', loadComponent: () => import('./contact/contact.component').then(m => m.ContactComponent) },
  { path: '**', redirectTo: '' },
];
