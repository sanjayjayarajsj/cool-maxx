// src/app/product-details/product-details.component.ts
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { SITE } from '../config/site.config';
import { PRODUCTS } from '../data/products';
import { getCategory } from '../data/categories';
import { SmartImgComponent } from '../shared/smart-img/smart-img.component';
import { ProductCardComponent } from '../shared/product-card/product-card.component';
import { RevealDirective } from '../shared/directives/reveal.directive';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [RouterLink, SmartImgComponent, ProductCardComponent, RevealDirective],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  site = SITE;
  private id = toSignal(inject(ActivatedRoute).paramMap.pipe(map(p => p.get('id'))));

  product = computed(() => PRODUCTS.find(p => p.id === this.id()));
  category = computed(() => getCategory(this.product()?.categoryId ?? ''));
  specs = computed(() => Object.entries(this.product()?.specifications ?? {}));
  related = computed(() => PRODUCTS.filter(p => p.categoryId === this.product()?.categoryId && p.id !== this.product()?.id).slice(0, 3));

  waLink = computed(() => {
    const p = this.product();
    return p ? `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(`Hi, I'm interested in ${p.name} (${p.model}).`)}` : '';
  });
}
