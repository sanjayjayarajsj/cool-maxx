// Usage: <span [countUp]="500" countSuffix="+"></span>  – counts from 0 when visible.
import { Directive, ElementRef, Input, OnDestroy, OnInit, inject } from '@angular/core';

@Directive({ selector: '[countUp]', standalone: true })
export class CountUpDirective implements OnInit, OnDestroy {
  @Input('countUp') target = 0;
  @Input() countSuffix = '';

  private el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private io?: IntersectionObserver;
  private raf = 0;

  ngOnInit() {
    this.el.textContent = `0${this.countSuffix}`;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      this.io?.disconnect();
      if (reduce) { this.el.textContent = `${this.target}${this.countSuffix}`; return; }
      const start = performance.now(), dur = 1600;
      const tick = (now: number) => {
        const t = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - t, 4);
        this.el.textContent = `${Math.round(this.target * eased)}${this.countSuffix}`;
        if (t < 1) this.raf = requestAnimationFrame(tick);
      };
      this.raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    this.io.observe(this.el);
  }

  ngOnDestroy() { this.io?.disconnect(); cancelAnimationFrame(this.raf); }
}
