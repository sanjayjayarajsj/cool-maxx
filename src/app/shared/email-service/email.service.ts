// src/app/shared/email-service/email.service.ts
// Keys live in src/app/config/site.config.ts  ->  SITE.emailjs
import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { SITE } from '../../config/site.config';

export interface EnquiryPayload {
  name: string;
  email: string;
  phone: string;
  product: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class EmailService {
  private cfg = SITE.emailjs;

  /** false while the placeholder keys are still in site.config.ts */
  get isConfigured(): boolean {
    return ![this.cfg.serviceId, this.cfg.templateId, this.cfg.publicKey].some(v => !v || v.startsWith('YOUR_'));
  }

  /**
   * Variables available in your EmailJS template:
   *   {{from_name}} {{from_email}} {{phone}} {{product}} {{message}} {{reply_to}}
   */
  sendEnquiry(d: EnquiryPayload) {
    return emailjs.send(
      this.cfg.serviceId,
      this.cfg.templateId,
      {
        from_name: d.name,
        from_email: d.email,
        reply_to: d.email,
        phone: d.phone || 'Not provided',
        product: d.product || 'General enquiry',
        message: d.message,
      },
      { publicKey: this.cfg.publicKey }
    );
  }
}
