Only known /pg/* paths proxy to LetsPay. Normal pages stay on Vercel.

- Both environments use www.mgrowgate.com; no dev domain or DNS changes are needed.
- Only known /pg/dev/* paths use the dev API (sandbox).
- Existing /pg/* checkout, return and webhook paths keep using the production API.
- Checkout links need a signed, expiring LetsPay token. No PG secrets are stored here.
- Webhooks forward to existing LetsPay signature-verifying handlers; no redirects.
- Unknown paths and preview hosts return 404 instead of the website HTML.
- Keep this website's existing production domain and HTTPS configuration unchanged.
- Register /pg/dev/webhooks/razorpay or /pg/dev/webhooks/cashfree for sandbox.
- Live webhooks keep /pg/webhooks/razorpay or /pg/webhooks/cashfree.
- LetsPay provider keys, webhook secrets and databases stay separate by environment.

Test routing: node --test tests/payment-routing.test.mjs
Check deployment: GET /pg/health and /pg/dev/health must return LetsPay JSON.
GET /pg/checkout and /pg/dev/checkout without a token must return 403.
Homepage/assets must still show this website. Unknown /pg/* paths must return 404.

This does not integrate this website's own checkout or deploy a new payment backend.
