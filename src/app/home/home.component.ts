// src/app/home/home.component.ts
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE } from '../config/site.config';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { GsapService } from '../shared/gsap.service';
import { ProductCardComponent } from '../shared/product-card/product-card.component';
import { SmartImgComponent } from '../shared/smart-img/smart-img.component';
import { RevealDirective } from '../shared/directives/reveal.directive';
import { CountUpDirective } from '../shared/directives/count-up.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ProductCardComponent, SmartImgComponent, RevealDirective, CountUpDirective],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  site = SITE;
  categories = CATEGORIES;
  featured = PRODUCTS.slice(0, 6);
  marquee = [...CATEGORIES, ...CATEGORIES]; // doubled for the seamless loop
  snow = Array.from({ length: 16 }, (_, i) => i);

  headline = ['Your', 'Trusted', 'Partner', 'for'];
  accent = ['AC', 'Spare', 'Parts'];

  why = [
    { title: 'Quality Assured', text: 'Every part is checked before it reaches your workshop.', icon: 'M12 2 4 6v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V6l-8-4zm-1.2 13.6-3.4-3.4 1.4-1.4 2 2 4.6-4.6 1.4 1.4-6 6z' },
    { title: 'Fast Dispatch', text: 'Ready stock and quick dispatch to keep your jobs on schedule.', icon: 'M13 2 3 14h7l-1 8 10-12h-7l1-8z' },
    { title: 'Expert Guidance', text: 'Not sure which part fits? Our team helps you choose the right one.', icon: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 15h-2v-2h2v2zm1.8-6.9c-.6.9-1.3 1.2-1.6 1.7-.1.2-.2.4-.2.9h-2c0-.8.2-1.3.5-1.7.4-.5 1-.9 1.3-1.2.4-.5.3-1.4-.5-1.6-.7-.2-1.5.2-1.7 1.1l-1.9-.4C9.3 7 10.7 6 12.1 6c1.4 0 2.5.7 2.9 1.9.3.9.1 1.6-.2 2.2z' },
    { title: 'Wide Range', text: 'Compressors to capacitors – one supplier for the whole job.', icon: 'M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z' },
  ];

  steps = [
    { n: '01', title: 'Browse', text: 'Explore categories and open any product to see its specifications.' },
    { n: '02', title: 'Enquire', text: 'Hit “Enquire” – the product details are pre-filled for you.' },
    { n: '03', title: 'Get your quote', text: 'We reply with availability and price, usually within a day.' },
  ];

  @ViewChild('hero', { static: true }) hero!: ElementRef<HTMLElement>;
  @ViewChild('vid', { static: true }) vid!: ElementRef<HTMLVideoElement>;
  private g = inject(GsapService);
  private ctx?: { revert(): void };
  private move?: (e: PointerEvent) => void;

  ngAfterViewInit() {
    // Autoplay needs the *property* muted = true (the attribute alone is not always enough)
    const v = this.vid.nativeElement;
    v.muted = true;
    v.play().catch(() => { /* browser blocked autoplay – poster stays visible */ });

    if (this.g.reducedMotion) return;
    const gsap = this.g.gsap;
    const root = this.hero.nativeElement;

    this.ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.word > span', { yPercent: 115, rotate: 4, duration: 1, stagger: 0.07, ease: 'power4.out' })
        .from('[data-in]', { y: 26, opacity: 0, duration: 0.8, stagger: 0.1 }, '-=0.6')
        .from('.frame', { scale: 0.9, opacity: 0, y: 40, duration: 1.2 }, 0.2)
        .from('.float-chip', { scale: 0.6, opacity: 0, duration: 0.8, stagger: 0.2, ease: 'back.out(1.8)' }, 0.9);

      // subtle 3D tilt of the video frame following the mouse (desktop only)
      if (matchMedia('(pointer: fine)').matches) {
        gsap.set('.frame', { transformPerspective: 900 });
        const rx = gsap.quickTo('.frame', 'rotationX', { duration: 0.7, ease: 'power3' });
        const ry = gsap.quickTo('.frame', 'rotationY', { duration: 0.7, ease: 'power3' });
        this.move = (e: PointerEvent) => {
          const r = root.getBoundingClientRect();
          ry(((e.clientX - r.left) / r.width - 0.5) * 10);
          rx(-((e.clientY - r.top) / r.height - 0.5) * 8);
        };
        root.addEventListener('pointermove', this.move, { passive: true });
      }
    }, root);
  }

  ngOnDestroy() {
    if (this.move) this.hero.nativeElement.removeEventListener('pointermove', this.move);
    this.ctx?.revert();
  }
}
