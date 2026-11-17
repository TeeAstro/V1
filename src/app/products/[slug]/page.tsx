import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { C2ProductView } from "@/components/site/C2ProductView";
import { PieceCard } from "@/components/site/PieceCard";
import { getOtherProducts, getProductBySlug, getProducts } from "@/utils/catalog";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  return product ? { title: product.name, description: product.summary } : {};
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const [first, second] = getOtherProducts(product);

  return (
    <>
      <div className="c2-shell-lg lg:pt-8">
        <C2ProductView product={product} />
      </div>

      <section className="c2-shell pb-28 pt-28 md:pb-44 md:pt-44" aria-labelledby="c2-related">
        <h2 id="c2-related" className="c2-h2 mb-10 md:mb-16">
          Complete <span className="italic">the look</span>
        </h2>
        <div className="grid gap-x-6 gap-y-16 lg:grid-cols-12">
          <PieceCard product={first} className="lg:col-span-5" />
          <PieceCard product={second} className="lg:col-span-5 lg:col-start-8 lg:mt-32" />
        </div>
      </section>
    </>
  );
}
