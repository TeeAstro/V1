# ATHAR THOBES storefront prototype

The combined direction chosen by the client: Concept 02's clean editorial layout, in
Concept 01's oxblood and ivory, opening with the calligraphic logo animation over the
desert photograph.

The store sells three pieces for men: one thobe (five colours), one shirt (five colours)
and one hat (three colours). Shipping is free in the United States.

This is a prototype for client presentation. There is no Shopify connection and no payment
processing. The bag is stored in the browser and the checkout is simulated.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000. For a production build, run `npm run build` then `npm start`.

## Deploy to Vercel

From this folder run `npx vercel`, then `npx vercel --prod`. Or push it to a GitHub
repository (choose no `.gitignore` template; this project has its own) and import it in Vercel.

## Pages

| Address | Page |
|---|---|
| `/` | Homepage |
| `/products/thobe` | The thobe |
| `/products/shirt` | The shirt |
| `/products/hat` | The hat |
| `/checkout` | Four-step simulated checkout |

The bag is a drawer, available from the header on every page.

## Structure

```
src/
  app/                    layout, pages, globals.css (palette), site.css (type and components)
  components/site/        header, footer, hero, thobe feature, piece card, swatches,
                          product view, cart drawer, checkout, newsletter, logo, links
  context/CartContext.tsx bag state, saved to localStorage
  data/products.ts        the three demo products and their colours
  utils/
    catalog.ts            the only place pages read catalogue data from
    types.ts              product and cart types
    format.ts             prices and shipping constants
  fonts/                  Bodoni Moda and Instrument Sans (self-hosted, SIL Open Font License)
public/
  brand/                  official logo files and the traced Arabic mark
  images/                 demonstration photography
```

## Changing colours, prices and photos

Everything is in `src/data/products.ts`. Each colour has a name, a swatch `hex` and a list
of photographs. To add a real photo, put it in `public/images` and point the colour at it.

Current range: thobe in White, Black, Rose maroon, Green and Dark brown (lengths 56, 58, 60);
shirt in Olive green, Dark blue, Dark brown, Mushroom and Light brown (S, M, L); hat in
Black, Brown and Beige (one size).

## Moving to Shopify

Pages never import `src/data` directly. They call the functions in `src/utils/catalog.ts`.
To go live, reimplement those functions with Storefront API queries, replace the store in
`CartContext.tsx` with the Storefront cart API, and send the checkout button to Shopify's
hosted checkout.

## Before this goes public

- **Logo**: `public/brand/athar-mark.png` was traced from a JPG. Replace it with vector artwork.
- **Photography**: the thobe, shirt and hat use the client's design images. The other shirt
  and hat colours are recoloured digitally as previews. The hero and story photos are stock.
  See `CREDITS.md`.
- **Prices, copy and policies** are demonstration content and need the client's sign-off.
