Only known /pg/* paths proxy to LetsPay. Normal pages stay on Vercel.

- Exact dev.mgrowgate.com uses the dev API (sandbox).
- Exact www.mgrowgate.com uses the production API.
- Checkout links need a signed, expiring LetsPay token. No PG secrets are stored here.
- Webhooks forward to existing LetsPay signature-verifying handlers; no redirects.
- Unknown paths and preview hosts return 404 instead of the website HTML.
- Attach the dev domain to this Vercel project and ensure both domains have valid HTTPS.
- Register /pg/webhooks/razorpay or /pg/webhooks/cashfree on the matching domain.

Test routing: node --test tests/payment-routing.test.mjs
Check deployment: GET /pg/health must return LetsPay JSON; GET /pg/checkout without a
token must return 403. Homepage/assets must still show this website.

This does not integrate this website's own checkout or deploy a new payment backend.
