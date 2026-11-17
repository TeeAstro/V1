import { products } from "@/data/products";
import type { Category, Product } from "./types";

/**
 * The only place pages read catalogue data from.
 * When Shopify is connected, reimplement these functions with
 * Storefront API queries and keep the signatures the same.
 */

export const CATEGORY_LABELS: Record<Category, string> = {
  thobes: "Thobes",
  shirts: "Shirts",
  hats: "Hats",
};

export function getProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductByCategory(category: Category): Product {
  return products.find((product) => product.category === category)!;
}

/** The other pieces in the range. */
export function getOtherProducts(product: Product): Product[] {
  return products.filter((other) => other.id !== product.id);
}
