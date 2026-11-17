"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { formatPrice } from "@/utils/format";
import type { Product } from "@/utils/types";
import { C2 } from "./links";
import { Swatches } from "./Swatches";

/** Homepage centrepiece: the one thobe, with its five colours to try. */
export function ThobeFeature({ product }: { product: Product }) {
  const [colour, setColour] = useState(product.colours[0]);
  const image = (colour.images ?? product.images)[0];

  return (
    <section className="c2-shell grid gap-y-8 lg:grid-cols-12" aria-labelledby="thobe-heading">
      <Link href={C2.thobe} className="lg:col-span-7" aria-label="View the thobe">
        <div className="c2-zoom relative aspect-[4/5] overflow-hidden bg-parchment">
          <AnimatePresence initial={false}>
            <motion.div
              key={image}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Image
                src={image}
                alt={`${product.name} in ${colour.name}`}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover object-top"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </Link>

      <div className="flex flex-col justify-end lg:col-span-5">
        <div className="lg:pb-6 lg:pl-12 xl:pl-20">
          <h2 id="thobe-heading" className="c2-h2">
            The <span className="italic">Thobe</span>
          </h2>
          <div className="mt-8 lg:max-w-sm">
            <p className="c2-caps mb-4 flex justify-between">
              <span>Five colours</span>
              <span className="text-muted" aria-live="polite">{colour.name}</span>
            </p>
            <Swatches colours={product.colours} selected={colour.name} onSelect={setColour} />
            <div className="mt-10 flex items-center justify-between">
              <Link href={C2.thobe} className="c2-btn">
                View the thobe
              </Link>
              <span className="text-lg tabular-nums">{formatPrice(product.price)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
