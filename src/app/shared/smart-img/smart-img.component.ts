// <app-smart-img [src]="product.image" [alt]="product.name" />
// Shows a neat snowflake placeholder when the path is empty or the file is missing.
import { ChangeDetectionStrategy, Component, Input, OnChanges, signal } from '@angular/core';

@Component({
  selector: 'app-smart-img',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (src && !failed()) {
      <img [src]="src" [alt]="alt" loading="lazy" decoding="async"
           [class.loaded]="loaded()" (load)="loaded.set(true)" (error)="failed.set(true)" />
    } @else {
      <div class="ph" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
          <path d="M12 2v20M4.2 7l15.6 10M19.8 7 4.2 17M9 3.5l3 2.5 3-2.5M9 20.5l3-2.5 3 2.5M3 10.5l3.6.4-.9-3.5M21 13.5l-3.6-.4.9 3.5M3 13.5l3.6-.4-.9 3.5M21 10.5l-3.6.4.9-3.5"/>
        </svg>
      </div>
    }
  `,
  styles: [`
    :host { display: block; width: 100%; height: 100%; overflow: hidden; }
    img { width: 100%; height: 100%; object-fit: cover; opacity: 0; transition: opacity .6s ease, transform .8s cubic-bezier(.22,.8,.24,1); }
    img.loaded { opacity: 1; }
    .ph { width: 100%; height: 100%; display: grid; place-items: center; color: #7fb4ee;
      background: radial-gradient(circle at 30% 20%, #ffffff, #dcecff 70%); }
    .ph svg { width: 38%; max-width: 90px; animation: spin 24s linear infinite; opacity: .8; }
    @keyframes spin { to { transform: rotate(360deg); } }
  `],
})
export class SmartImgComponent implements OnChanges {
  @Input() src = '';
  @Input() alt = '';
  failed = signal(false);
  loaded = signal(false);
  ngOnChanges() { this.failed.set(false); this.loaded.set(false); }
}
