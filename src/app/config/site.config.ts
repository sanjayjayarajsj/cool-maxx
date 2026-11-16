// src/app/config/site.config.ts
// ============================================================
//  ONE PLACE TO EDIT: company info, asset paths and EmailJS keys
// ============================================================

export const SITE = {
  name: 'COOL MAXX',
  tagline: 'A/C Spare Parts',

  // ---------- contact details (shown on Contact page + footer) ----------
  phone: '+91 00000 00000',          // TODO: your phone
  whatsapp: '910000000000',          // TODO: digits only, with country code (leave '' to hide WhatsApp buttons)
  email: 'info@yourdomain.com',      // TODO: your public email
  hours: 'Mon – Sat · 9:00 AM – 7:00 PM',
  addressLines: ['Cool Maxx Office', '123 Main Street, Suite 4B', 'City, State, PIN'], // TODO

  // Google Maps: type your shop address / name here, the map will embed automatically
  mapQuery: 'Cool Maxx AC Spare Parts',                          // TODO
  mapLink: 'https://maps.app.goo.gl/QRRApgz4bmYBScHT8',          // "Open in Google Maps" button

  // ---------- EmailJS (https://dashboard.emailjs.com) ----------
  emailjs: {
    serviceId: 'YOUR_SERVICE_ID',    // Email Services  -> Service ID
    templateId: 'YOUR_TEMPLATE_ID',  // Email Templates -> Template ID
    publicKey: 'YOUR_PUBLIC_KEY',    // Account -> General -> Public Key
  },

  // ---------- asset paths (relative to src/assets) ----------
  assets: {
    logo: 'assets/logo/logo.jpg',
    heroVideo: 'assets/hero/Logo_animation_for_AC_shop_29e9bde9_t2.4-10.mp4',
    heroPoster: '',                  // optional: 'assets/hero/poster.jpg' (shown while video loads)
    aboutImage: '',                  // optional: 'assets/about/about.webp'
  },

  // ---------- numbers shown on Home / About (edit to real values) ----------
  stats: [
    { value: 500, suffix: '+', label: 'Spare parts listed' },
    { value: 40, suffix: '+', label: 'Trusted brands' },
    { value: 10, suffix: '+', label: 'Years in HVAC' },
    { value: 24, suffix: 'h', label: 'Enquiry response' },
  ],
};
