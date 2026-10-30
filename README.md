# ALL-IN-ONE-CART

Responsive React + Vite storefront starter for the ALL-IN-ONE-CART project.

## Included
- Mobile-friendly storefront and product-link request form
- Customer contact and delivery-address fields
- Cash on Delivery request selection
- Supabase order-submission integration
- SEO title, description, and indexing defaults
- WhatsApp support button (configure your number)
- Tracking-code generation in the database schema

## Important setup before real customer use
This is the first website build, not a fully launched store. Real order submission requires a Supabase project and environment variables. Admin login, private admin order viewing/updating, customer tracking lookup, and AI assistant still need to be implemented and security-tested. Do not publish customer data or use a public database read policy.

## Run locally
1. Install Node.js.
2. Run `npm install`.
3. Copy `.env.example` to `.env`.
4. Add your Supabase project URL and publishable/anon key.
5. Add your WhatsApp number in international format without `+`.
6. Run `npm run dev`.

## Supabase
1. Create a Supabase project.
2. Open SQL Editor and run `supabase/schema.sql`.
3. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to `.env` locally and to Vercel Project Settings → Environment Variables.
4. Redeploy after adding environment variables.

Use only the publishable/anon key in the browser. NEVER put a Supabase service-role key or other secret in frontend code.

## Deploy on Vercel
Import this GitHub repository into Vercel. Framework preset: Vite. Build command: `npm run build`. Output directory: `dist`.

## Google visibility
The site includes basic SEO metadata. Google indexing is not guaranteed. After deployment, add the real domain to Google Search Console and submit a sitemap. Add `sitemap.xml` once the final production domain is known.
