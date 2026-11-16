// src/app/services/category.service.ts

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from '../models/category.model';
import { CATEGORIES } from '../data/categories';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  /**
   * Returns the list of product categories as an observable.
   * Using `of` keeps the API simple for the demo; replace with HTTP calls later.
   */
  getCategories(): Observable<Category[]> {
    return of(CATEGORIES);
  }
}
