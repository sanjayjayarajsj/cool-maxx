// src/app/contact/contact.component.ts
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SITE } from '../config/site.config';
import { EmailService } from '../shared/email-service/email.service';
import { SafePipe } from '../shared/safe-pipe/safe.pipe';
import { RevealDirective } from '../shared/directives/reveal.directive';

type Status = 'idle' | 'sending' | 'success' | 'error';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, SafePipe, RevealDirective],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  site = SITE;
  mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(SITE.mapQuery)}&output=embed`;

  private fb = inject(FormBuilder);
  private email = inject(EmailService);
  private route = inject(ActivatedRoute);

  status = signal<Status>('idle');
  errorMsg = signal('');

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    product: [''],
    message: ['', [Validators.required, Validators.minLength(10)]],
    website: [''], // honeypot – real people never fill this, bots do
  });

  ngOnInit() {
    // "Enquire about this product" button sends /contact?product=...
    const product = this.route.snapshot.queryParamMap.get('product');
    if (product) {
      this.form.patchValue({ product, message: `Hi, I'd like a quote for ${product}. Please share price and availability.` });
    }
  }

  invalid(name: 'name' | 'email' | 'message') {
    const c = this.form.controls[name];
    return c.invalid && (c.touched || c.dirty);
  }

  async submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    if (this.form.controls.website.value) { this.status.set('success'); return; } // bot caught

    if (!this.email.isConfigured) {
      this.errorMsg.set('Email is not set up yet. Add your EmailJS keys in src/app/config/site.config.ts.');
      this.status.set('error');
      return;
    }

    this.status.set('sending');
    try {
      const { name, email, phone, product, message } = this.form.getRawValue();
      await this.email.sendEnquiry({ name, email, phone, product, message });
      this.status.set('success');
      this.form.reset();
    } catch (err) {
      console.error('EmailJS error', err);
      this.errorMsg.set('Sorry, we could not send your message. Please try again or call us directly.');
      this.status.set('error');
    }
  }

  reset() { this.status.set('idle'); }
}
