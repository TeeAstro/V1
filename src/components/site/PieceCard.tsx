"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cx, formatPrice } from "@/utils/format";
import type { Product } from "@/utils/types";
import { C2 } from "./links";
import { Swatches } from "./Swatches";

interface Props {
  product: Product;
  aspect?: string;
  sizes?: string;
  className?: string;
}

/** A product tile. Choosing a swatch changes the photograph in place. */
export function PieceCard({
  product,
  aspect = "aspect-[4/5]",
  sizes = "(min-width: 1024px) 40vw, 100vw",
  className,
}: Props) {
  const [colour, setColour] = useState(product.colours[0]);
  const image = (colour.images ?? product.images)[0];

  return (
    <article className={className}>
      <Link href={C2.product(product.slug)} aria-label={product.name} className="block">
        <div className={cx("c2-zoom relative overflow-hidden bg-parchment", aspect)}>
          <AnimatePresence initial={false}>
            <motion.div
              key={image}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Image src={image} alt={`${product.name} in ${colour.name}`} fill sizes={sizes} className="object-cover" />
            </motion.div>
          </AnimatePresence>
        </div>
      </Link>
      <div className="mt-5 flex items-start justify-between gap-6">
        <div>
          <h3 className="c2-h3">
            <Link href={C2.product(product.slug)}>{product.name.replace(/^The Athar /, "The ")}</Link>
          </h3>
          <p className="mt-1 text-muted">
            {formatPrice(product.price)}, in {colour.name.toLowerCase()}
          </p>
        </div>
        <div className="pt-2">
          <Swatches colours={product.colours} selected={colour.name} onSelect={setColour} size="sm" />
        </div>
      </div>
    </article>
  );
}
