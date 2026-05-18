# Silvias Coiffeursalon Website

Premium, mobile-first Next.js website for Silvias Coiffeursalon in Emmenbrücke.

Production preview: `https://silvias-coiffeursalon.vercel.app`

## Run locally

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:3000`.

Useful checks:

```bash
npm run typecheck
npm run lint
npm run build
```

## Edit salon data

Main salon data lives in:

- `data/site.ts` for name, address, phone, WhatsApp, email, opening hours, SEO and links
- `data/services.ts` for categories, services, prices and durations
- `data/gallery.ts` for gallery images
- `data/testimonials.ts` for reviews

The current Google Business link, Google Maps link, external booking link, real images, testimonials, specializations, legal text and personal story are marked with TODO comments.

## Add real images

Replace the placeholder SVG files in `public/images` with real salon photos or finished work.

Keep the same filenames if you do not want to edit the data files. Otherwise update the `image` or `src` fields in `data/services.ts` and `data/gallery.ts`.

## Buchungssystem

The booking flow is on `/online-buchen`.

It currently supports:

- service selection
- generated time slots from opening hours
- customer details
- payment method choice
- booking summary
- `.ics` calendar download
- WhatsApp fallback with prefilled booking details
- cancellation page at `/termin-stornieren`
- development-only admin overview at `/admin/bookings`

Services, prices and durations are edited in `data/services.ts`.

The current booking storage is an in-memory prototype in `lib/booking-store.ts`. It is useful for testing the UX, but it is not persistent and must be replaced before production. Bookings disappear when the dev server restarts.

New bookings are currently stored as `pending` / "Anfrage erhalten". This avoids overpromising until real persistence, email notification and calendar sync are connected.

Booking architecture:

- `components/booking-wizard.tsx` handles the customer booking flow
- `components/cancellation-form.tsx` handles customer cancellation
- `app/api/bookings/route.ts` creates bookings
- `app/api/bookings/cancel/route.ts` previews and cancels bookings
- `lib/booking-types.ts` defines the booking model
- `lib/availability.ts` generates opening-hour based slots
- `lib/calendar.ts` creates customer `.ics` files
- `lib/notifications.ts` prepares salon and customer email notifications
- `lib/calendar-sync.ts` marks the future Google Calendar or CalDAV integration

Payment methods shown today:

- Bar vor Ort
- TWINT vor Ort
- TWINT nach Bestätigung
- Zahlung später nach Absprache

The admin page at `/admin/bookings` is a preparation route only. Add authentication and role protection before using it with real customer data.

Production database options:

- Supabase
- PostgreSQL with Prisma
- MongoDB
- Firebase

Recommended for this project: Supabase. It gives a small salon project Postgres persistence, dashboard access, row-level security and a simple upgrade path without introducing much backend complexity.

## Email sending

The notification utility is prepared for salon and customer emails:

- `lib/notifications.ts`

Recommended simple options:

- Resend
- Nodemailer with SMTP
- a Swiss hosting provider SMTP mailbox

Before launch, configure real sending for salon notifications to `silviadeverin@gmail.com` and customer confirmation emails. Attach or link the generated `.ics` calendar event.

## TWINT integration

The booking flow includes a TWINT payment placeholder only. Real TWINT payment requires a provider/API, for example:

- Datatrans
- Worldline
- Payrexx
- another Swiss payment provider
- a Stripe-compatible workaround if appropriate

Do not collect real payment until provider credentials, contracts, webhook handling and payment reconciliation are configured.

## Google Calendar or Apple Calendar sync

Current level:

- customer can download an `.ics` file
- the booking/cancellation details can be sent to Silvia by WhatsApp
- API TODOs mark where email and calendar sync should be connected

Future level:

- connect Google Calendar API or CalDAV
- create an event automatically after booking
- cancel/delete the event automatically after cancellation
- store the external calendar event ID in the production database

Do not fake calendar sync without credentials.

## Before production

Still required before using the booking system for real appointments:

- persistent database storage
- email provider credentials
- admin authentication
- final cancellation rules
- final service list, prices and durations
- real TWINT provider if online payment is required
- Google Calendar API or CalDAV credentials if automatic calendar sync is required
- privacy policy and legal text
