"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { useCart } from "@/context/CartContext";
import { cx, formatPrice } from "@/utils/format";
import { CATEGORY_LABELS } from "@/utils/catalog";
import { Swatches } from "./Swatches";
import type { Product } from "@/utils/types";

export function C2ProductView({ product }: { product: Product }) {
  const { add } = useCart();
  const [colour, setColour] = useState(product.colours[0]);
  // A piece that comes in one size needs no choice.
  const [size, setSize] = useState<string | null>(product.sizes.length === 1 ? product.sizes[0] : null);
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [slide, setSlide] = useState(0);
  const sizeRef = useRef<HTMLFieldSetElement>(null);

  const images = colour?.images ?? product.images;
  const words = product.name.split(" ");
  const guide = product.sizeGuide ?? {};
  const noun = product.category === "thobes" ? "length" : "size";

  function handleAdd() {
    if (!size) {
      setSizeError(true);
      sizeRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    add(product, { colour: colour?.name, size, image: images[0], quantity });
  }

  return (
    <div className="lg:grid lg:grid-cols-12 lg:gap-x-6">
      {/* Mobile: swipe through the photographs. */}
      <div className="relative lg:hidden">
        <div
          key={colour?.name}
          className="c2-noscrollbar flex snap-x snap-mandatory overflow-x-auto"
          onScroll={(event) => {
            const el = event.currentTarget;
            setSlide(Math.round(el.scrollLeft / el.clientWidth));
          }}
        >
          {images.map((src, index) => (
            <div key={src} className="relative aspect-[3/4] w-full shrink-0 snap-center bg-parchment">
              <Image
                src={src}
                alt={`${product.name}, image ${index + 1}`}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
        {images.length > 1 && (
          <p className="c2-caps absolute bottom-4 right-5 bg-ivory/85 px-2.5 py-1.5 tabular-nums backdrop-blur-sm">
            {Math.min(slide + 1, images.length)} / {images.length}
          </p>
        )}
      </div>

      {/* Desktop: the photographs stack and scroll while the details stay put. */}
      <div key={`stack-${colour?.name}`} className="hidden gap-6 lg:col-span-7 lg:grid lg:grid-cols-2">
        {images.map((src, index) => (
          <motion.div
            key={src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: index * 0.08 }}
            className={cx(
              "relative overflow-hidden bg-parchment",
              index === 0 || images.length === 2 ? "col-span-2 aspect-[4/5]" : "aspect-[3/4]",
              images.length % 2 === 0 && images.length > 2 && index === images.length - 1 && "col-span-2 aspect-[4/5]",
            )}
          >
            <Image
              src={src}
              alt={`${product.name}, image ${index + 1}`}
              fill
              priority={index === 0}
              sizes={index === 0 ? "58vw" : "29vw"}
              className="object-cover"
            />
          </motion.div>
        ))}
      </div>

      <div className="c2-shell pt-8 lg:col-span-4 lg:col-start-9 lg:px-0 lg:pt-0">
        <div className="lg:sticky lg:top-28 lg:pr-6 xl:pr-12">
          <p className="c2-caps text-muted">
            {CATEGORY_LABELS[product.category]}
          </p>
          <h1 className="c2-h2 mt-4">
            {words.slice(0, -1).join(" ")} <span className="italic">{words[words.length - 1]}</span>
          </h1>
          <p className="mt-5 text-lg tabular-nums">{formatPrice(product.price)}</p>
          <p className="mt-6 text-base leading-relaxed text-muted">{product.description}</p>

          {product.colours.length > 0 && (
            <fieldset className="mt-10">
              <legend className="c2-caps flex w-full justify-between">
                <span>Colour</span>
                <span className="text-muted">{colour.name}</span>
              </legend>
              <div className="mt-4">
                <Swatches
                  colours={product.colours}
                  selected={colour.name}
                  onSelect={(option) => {
                    setColour(option);
                    setSlide(0);
                  }}
                />
              </div>
            </fieldset>
          )}

          <fieldset ref={sizeRef} className="mt-10">
            <legend className="c2-caps">{product.sizeLabel}</legend>
            <p className="mt-1 text-sm text-muted" aria-live="polite">
              {size ? (guide[size] ?? "Fits most") : `Select a ${noun}`}
            </p>
            <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
              {product.sizes.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setSize(option);
                    setSizeError(false);
                  }}
                  aria-pressed={option === size}
                  className={cx(
                    "c2-link py-1 text-xl tabular-nums transition-colors",
                    option === size ? "text-maroon" : "text-faint hover:text-ink",
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
            {sizeError && (
              <p className="mt-3 text-sm text-maroon" role="alert">
                Choose a {noun} to add this to your bag.
              </p>
            )}
          </fieldset>

          <div className="mt-10 flex items-stretch gap-4">
            <div className="flex items-center gap-3 border-b border-line px-1" role="group" aria-label="Quantity">
              <button
                type="button"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
                className="grid size-8 place-items-center text-lg disabled:opacity-30"
              >
                &minus;
              </button>
              <span className="w-5 text-center tabular-nums" aria-live="polite">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((value) => value + 1)}
                aria-label="Increase quantity"
                className="grid size-8 place-items-center text-lg"
              >
                +
              </button>
            </div>
            <button type="button" onClick={handleAdd} className="c2-btn flex-1 whitespace-nowrap px-5" data-testid="c2-add">
              Add to bag
            </button>
          </div>
          <p className="mt-4 text-sm text-muted">
            Free shipping in the United States. Returns within 30 days, unworn.
          </p>

          <div className="mt-12 border-t border-line/70">
            <Accordion title="Details and care" defaultOpen>
              <ul className="space-y-1.5">
                {product.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </Accordion>
            {product.sizeGuide && (
              <Accordion title={product.category === "thobes" ? "Finding your length" : "Size guide"}>
                {product.category === "thobes" && (
                  <p className="mb-4">
                    Sizes are the finished length from the top of the shoulder to the hem. Measure
                    from your shoulder to your ankle bone and choose the closest length. The heights
                    below are a guide.
                  </p>
                )}
                <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 tabular-nums">
                  {product.sizes.map((option) => (
                    <div key={option} className="contents">
                      <dt className="text-ink">{option}</dt>
                      <dd>{guide[option]}</dd>
                    </div>
                  ))}
                </dl>
              </Accordion>
            )}
            <Accordion title="Shipping and returns">
              <p>
                Shipping is free in the United States and takes 3 to 5 business days. International
                orders take 7 to 12 business days, with duties shown at checkout. Unworn pieces can be returned within 30 days.
              </p>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}

function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-line/70">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="c2-caps flex w-full items-center justify-between py-5 text-left"
      >
        {title}
        <span aria-hidden className="text-base font-normal leading-none">{open ? "−" : "+"}</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-6 leading-relaxed text-muted">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
