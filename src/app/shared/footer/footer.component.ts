// src/app/shared/footer/footer.component.ts
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE } from '../../config/site.config';
import { CATEGORIES } from '../../data/categories';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  site = SITE;
  categories = CATEGORIES;
  year = new Date().getFullYear();
  scrollTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }
}
