"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useCart } from "@/context/CartContext";
import { formatPrice, sizeText } from "@/utils/format";
import { C2 } from "./links";

const ease = [0.22, 1, 0.36, 1] as const;

export function C2CartDrawer() {
  const { isOpen, close, lines, subtotal, count, setQuantity, remove } = useCart();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);


  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="scrim"
            className="fixed inset-0 z-50 bg-ink/30 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={close}
            aria-hidden
          />
          <motion.aside
            key="drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Your bag"
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[32rem] flex-col bg-ivory text-ink"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease }}
          >
            <div className="flex items-baseline justify-between px-6 pb-5 pt-7 md:px-10">
              <h2 className="c2-h3 italic">
                Bag <span className="not-italic tabular-nums text-faint">({count})</span>
              </h2>
              <button ref={closeRef} type="button" onClick={close} className="c2-caps c2-link">
                Close
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col justify-center gap-8 px-6 md:px-10">
                <p className="c2-h2 italic">Nothing here yet.</p>
                <div className="c2-caps flex gap-8">
                  <Link href={C2.thobe} onClick={close} className="c2-link c2-link-on">Thobes</Link>
                  <Link href={C2.shirt} onClick={close} className="c2-link c2-link-on">Shirts</Link>
                  <Link href={C2.hat} onClick={close} className="c2-link c2-link-on">Hats</Link>
                </div>
              </div>
            ) : (
              <>
                <p className="mx-6 border-t border-line pt-3 text-sm text-muted md:mx-10">
                  Free shipping in the United States.
                </p>

                <ul className="flex-1 overflow-y-auto px-6 py-4 md:px-10">
                  <AnimatePresence initial={false}>
                    {lines.map((line) => (
                      <motion.li
                        key={line.key}
                        layout
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35 }}
                        className="overflow-hidden"
                      >
                        <div className="flex gap-5 py-4">
                          <Link
                            href={C2.product(line.slug)}
                            onClick={close}
                            className="relative aspect-[3/4] w-28 shrink-0 overflow-hidden bg-parchment"
                          >
                            <Image src={line.image} alt={line.name} fill sizes="112px" className="object-cover" />
                          </Link>
                          <div className="flex min-w-0 flex-1 flex-col">
                            <div className="flex items-start justify-between gap-4">
                              <Link href={C2.product(line.slug)} onClick={close} className="c2-serif text-xl leading-tight">
                                {line.name.replace(/^The /, "")}
                              </Link>
                              <span className="tabular-nums">{formatPrice(line.price * line.quantity)}</span>
                            </div>
                            <p className="mt-1 text-sm text-muted">
                              {[line.colour, line.size && sizeText(line.size)].filter(Boolean).join(" / ")}
                            </p>
                            <div className="mt-auto flex items-center justify-between pt-4">
                              <div className="flex items-center gap-4" role="group" aria-label={`Quantity of ${line.name}`}>
                                <button
                                  type="button"
                                  onClick={() => setQuantity(line.key, line.quantity - 1)}
                                  disabled={line.quantity <= 1}
                                  aria-label="Decrease quantity"
                                  className="grid size-7 place-items-center text-lg leading-none disabled:opacity-30"
                                >
                                  &minus;
                                </button>
                                <span className="w-4 text-center tabular-nums" aria-live="polite">{line.quantity}</span>
                                <button
                                  type="button"
                                  onClick={() => setQuantity(line.key, line.quantity + 1)}
                                  aria-label="Increase quantity"
                                  className="grid size-7 place-items-center text-lg leading-none"
                                >
                                  +
                                </button>
                              </div>
                              <button
                                type="button"
                                onClick={() => remove(line.key)}
                                aria-label={`Remove ${line.name} from bag`}
                                className="c2-caps c2-link text-muted"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>

                <div className="bg-parchment px-6 pb-7 pt-6 md:px-10">
                  <div className="flex items-baseline justify-between">
                    <span className="c2-caps">Subtotal</span>
                    <span className="text-2xl tabular-nums">{formatPrice(subtotal)}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted">Taxes are calculated at checkout.</p>
                  <Link href={C2.checkout} onClick={close} className="c2-btn mt-6 w-full">
                    Checkout
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
