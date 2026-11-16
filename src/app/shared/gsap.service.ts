// src/app/shared/gsap.service.ts
import { Injectable } from '@angular/core';
import { gsap } from 'gsap';

/** Thin wrapper so components share one GSAP instance. */
@Injectable({ providedIn: 'root' })
export class GsapService {
  readonly gsap = gsap;

  get reducedMotion(): boolean {
    return matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
}
