// src/app/products/products.component.ts
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { ProductCardComponent } from '../shared/product-card/product-card.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  private route = inject(ActivatedRoute);

  /** active category comes from the URL: /products?category=compressors */
  category = toSignal(this.route.queryParamMap.pipe(map(p => p.get('category') ?? 'all')), { initialValue: 'all' });
  query = signal('');

  chips = computed(() => [
    { id: 'all', name: 'All', count: PRODUCTS.length },
    ...CATEGORIES.map(c => ({ id: c.id, name: c.name, count: PRODUCTS.filter(p => p.categoryId === c.id).length })),
  ]);

  filtered = computed(() => {
    const cat = this.category(), q = this.query().trim().toLowerCase();
    return PRODUCTS.filter(p =>
      (cat === 'all' || p.categoryId === cat) &&
      (!q || `${p.name} ${p.brand} ${p.model} ${p.shortDescription}`.toLowerCase().includes(q))
    );
  });

  onSearch(e: Event) { this.query.set((e.target as HTMLInputElement).value); }
  clear() { this.query.set(''); }
}
