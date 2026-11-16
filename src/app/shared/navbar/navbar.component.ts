// src/app/shared/navbar/navbar.component.ts
import { Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild, inject, signal } from '@angular/core';
import { NavigationStart, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { SITE } from '../../config/site.config';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  site = SITE;
  open = signal(false);
  scrolled = signal(false);
  links = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  @ViewChild('bar', { static: true }) bar!: ElementRef<HTMLElement>;
  private zone = inject(NgZone);
  private router = inject(Router);
  private onScroll = () => this.update();
  private ticking = false;

  ngOnInit() {
    // Scroll listener runs OUTSIDE Angular so scrolling never triggers change detection.
    this.zone.runOutsideAngular(() => window.addEventListener('scroll', this.onScroll, { passive: true }));
    this.router.events.pipe(filter(e => e instanceof NavigationStart)).subscribe(() => this.close());
    this.update();
  }

  private update() {
    if (this.ticking) return;
    this.ticking = true;
    requestAnimationFrame(() => {
      this.ticking = false;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - innerHeight;
      this.bar.nativeElement.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      const s = y > 24;
      if (s !== this.scrolled()) this.zone.run(() => this.scrolled.set(s));
    });
  }

  toggle() { this.open.update(v => !v); document.body.classList.toggle('no-scroll', this.open()); }
  close() { this.open.set(false); document.body.classList.remove('no-scroll'); }

  ngOnDestroy() { window.removeEventListener('scroll', this.onScroll); }
}
