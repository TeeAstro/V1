/** Every URL in the site, in one place. */
export const C2 = {
  home: "/",
  thobe: "/products/thobe",
  shirt: "/products/shirt",
  hat: "/products/hat",
  story: "/#story",
  checkout: "/checkout",
  product: (slug: string) => `/products/${slug}`,
} as const;
