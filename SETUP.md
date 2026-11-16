# COOL MAXX – update guide

## 1. Copy the files
Copy everything in this folder into your project (same paths, overwrite when asked).
`src/assets` is NOT included – your logo / video / product images stay as they are.

## 2. Delete these (no longer used)
- src/styles/_variables.scss          (design tokens now live in src/styles.scss)
- src/app/app.component.spec.ts       (default test, checks text that doesn't exist)
- src/styles.css                      (empty duplicate of styles.scss, if present)

## 3. Remove the duplicate EmailJS package
    npm uninstall emailjs-com

## 4. Logo / video fix (already inside angular.json)
Root cause: angular.json only copied the `public` folder, never `src/assets`.
build -> options -> assets must contain BOTH entries:

    "assets": [
      { "glob": "**/*", "input": "public" },
      { "glob": "**/*", "input": "src/assets", "output": "/assets" }
    ]

Then STOP and restart `ng serve` (angular.json changes need a restart).

## 5. EmailJS
Edit src/app/config/site.config.ts -> emailjs { serviceId, templateId, publicKey }.
Variables available in your EmailJS template:
  {{from_name}} {{from_email}} {{phone}} {{product}} {{message}} {{reply_to}}
Set "To email" to your own inbox and "Reply-To" to {{reply_to}}.

## 6. Your own content
- src/app/config/site.config.ts   phone, email, address, map, whatsapp, asset paths, stats numbers
- src/app/data/categories.ts      category names + `image` path ('' = placeholder)
- src/app/data/products.ts        products + `image` path
