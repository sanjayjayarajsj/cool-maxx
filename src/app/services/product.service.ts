// src/app/services/product.service.ts

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';
import { PRODUCTS } from '../data/products';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  /** Return all products as an observable */
  getProducts(): Observable<Product[]> {
    return of(PRODUCTS);
  }

  /** Return a single product by its id */
  getProductById(id: string): Observable<Product | undefined> {
    const product = PRODUCTS.find(p => p.id === id);
    return of(product);
  }

  /** Search products by name or short description */
  searchProducts(term: string): Observable<Product[]> {
    const lowered = term.toLocaleLowerCase();
    const filtered = PRODUCTS.filter(
      p => p.name.toLocaleLowerCase().includes(lowered) || p.shortDescription.toLocaleLowerCase().includes(lowered)
    );
    return of(filtered);
  }

  /** Filter by category id */
  filterByCategory(categoryId: string): Observable<Product[]> {
    const filtered = PRODUCTS.filter(p => p.categoryId === categoryId);
    return of(filtered);
  }

  /** Filter by brand */
  filterByBrand(brand: string): Observable<Product[]> {
    const filtered = PRODUCTS.filter(p => p.brand.toLocaleLowerCase() === brand.toLocaleLowerCase());
    return of(filtered);
  }
}
