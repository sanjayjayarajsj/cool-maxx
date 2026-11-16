// Usage: <div reveal> or <div reveal="left" [revealDelay]="120">
// Fades/slides the element in once when it scrolls into view (IntersectionObserver – very cheap).
import { Directive, ElementRef, Input, OnDestroy, OnInit, inject } from '@angular/core';

@Directive({ selector: '[reveal]', standalone: true })
export class RevealDirective implements OnInit, OnDestroy {
  @Input('reveal') variant: '' | 'up' | 'left' | 'right' | 'zoom' = '';
  @Input() revealDelay = 0;

  private el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private io?: IntersectionObserver;

  ngOnInit() {
    const el = this.el;
    el.classList.add('reveal');
    if (this.variant) el.dataset['reveal'] = this.variant;
    if (this.revealDelay) el.style.transitionDelay = `${this.revealDelay}ms`;

    if (typeof IntersectionObserver === 'undefined') { el.classList.add('in'); return; }
    this.io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.classList.add('in');
        this.io?.disconnect();
        // remove the delay after the entrance so hover transitions stay snappy
        setTimeout(() => (el.style.transitionDelay = ''), 900 + this.revealDelay);
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    this.io.observe(el);
  }

  ngOnDestroy() { this.io?.disconnect(); }
}
