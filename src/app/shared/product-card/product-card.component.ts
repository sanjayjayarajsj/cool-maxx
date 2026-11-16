// src/app/shared/product-card/product-card.component.ts
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';
import { getCategory } from '../../data/categories';
import { SmartImgComponent } from '../smart-img/smart-img.component';

@Component({
  selector: 'app-product-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, SmartImgComponent],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  get categoryName() { return getCategory(this.product.categoryId)?.name ?? ''; }
}
