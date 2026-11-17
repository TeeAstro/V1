"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import {
  EXPRESS_SHIPPING,
  HOME_COUNTRY,
  INTERNATIONAL_SHIPPING,
  sizeText,
  cx,
  formatPrice,
} from "@/utils/format";
import type { CartLine } from "@/utils/types";
import { C2 } from "./links";

type Delivery = "standard" | "express";

interface Details {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  region: string;
  postal: string;
  country: string;
}

const EMPTY: Details = {
  email: "",
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  region: "",
  postal: "",
  country: "United States",
};

const STEPS = ["Contact", "Shipping address", "Delivery", "Payment"] as const;

interface Receipt {
  number: string;
  email: string;
  lines: CartLine[];
  subtotal: number;
  shipping: number;
}

/**
 * Simulated checkout, one step at a time. Nothing is validated against a
 * payment provider, stored or sent. Shopify's checkout replaces this later.
 */
export function C2Checkout() {
  const { lines, subtotal, clear } = useCart();
  const [step, setStep] = useState(0);
  const [details, setDetails] = useState<Details>(EMPTY);
  const [delivery, setDelivery] = useState<Delivery>("standard");
  const [receipt, setReceipt] = useState<Receipt | null>(null);

  const domestic = details.country === HOME_COUNTRY;
  const standard = domestic ? 0 : INTERNATIONAL_SHIPPING;
  const shipping = delivery === "express" ? EXPRESS_SHIPPING : standard;
  const set = (key: keyof Details) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setDetails((current) => ({ ...current, [key]: event.target.value }));

  function next(event: React.FormEvent) {
    event.preventDefault();
    if (step < STEPS.length - 1) {
      setStep(step + 1);
      return;
    }
    setReceipt({
      number: `AT-${Math.floor(10000 + Math.random() * 90000)}`,
      email: details.email,
      lines,
      subtotal,
      shipping,
    });
    clear();
    window.scrollTo({ top: 0 });
  }

  if (receipt) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-2xl py-16 text-center md:py-28"
      >
        <p className="c2-caps text-muted">Order {receipt.number}</p>
        <h1 className="c2-h2 mt-6">
          Thank you. <span className="italic">Demo order placed.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-base text-muted" role="status">
          In the live store a confirmation would be sent to {receipt.email}. No payment was taken.
        </p>
        <div className="mt-12 text-left">
          <Summary lines={receipt.lines} subtotal={receipt.subtotal} shipping={receipt.shipping} />
        </div>
        <Link href={C2.home} className="c2-btn mt-12">
          Continue shopping
        </Link>
      </motion.div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="py-24 md:py-36">
        <h1 className="c2-h2 italic">Your bag is empty.</h1>
        <p className="mt-5 text-base text-muted">Add a piece before checking out.</p>
        <div className="c2-caps mt-8 flex gap-8">
          <Link href={C2.thobe} className="c2-link c2-link-on">Thobes</Link>
          <Link href={C2.shirt} className="c2-link c2-link-on">Shirts</Link>
          <Link href={C2.hat} className="c2-link c2-link-on">Hats</Link>
        </div>
      </div>
    );
  }

  const summaries = [
    details.email,
    [details.firstName, details.lastName].join(" ") + `, ${details.address}, ${details.city}, ${details.region} ${details.postal}, ${details.country}`,
    delivery === "express" ? "Express, 1 to 2 business days" : domestic ? "Standard, free, 3 to 5 business days" : "Standard international, 7 to 12 business days",
    "",
  ];

  return (
    <div className="grid gap-x-6 gap-y-14 py-10 md:py-16 lg:grid-cols-12">
      <div className="lg:col-span-6">
        <h1 className="c2-h2">Checkout</h1>
        <p className="mt-5 text-sm text-muted">
          This is a demonstration. No payment is taken and nothing you enter is saved or sent.
        </p>

        <ol className="mt-10 border-t border-line/70">
          {STEPS.map((title, index) => {
            const active = index === step;
            const done = index < step;
            return (
              <li key={title} className="border-b border-line/70">
                <div className="flex items-baseline justify-between gap-6 py-6">
                  <h2 className={cx("c2-h3 flex gap-5", !active && !done && "text-faint")}>
                    <span className="italic tabular-nums">{index + 1}</span>
                    {title}
                  </h2>
                  {done && (
                    <button type="button" onClick={() => setStep(index)} className="c2-caps c2-link c2-link-on shrink-0">
                      Edit
                    </button>
                  )}
                </div>
                {done && <p className="-mt-3 pb-6 pl-10 text-muted">{summaries[index]}</p>}

                <AnimatePresence initial={false}>
                  {active && (
                    <motion.form
                      key="form"
                      onSubmit={next}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-x-6 gap-y-5 pb-8 sm:grid-cols-2">
                        {index === 0 && (
                          <Field label="Email" type="email" autoComplete="email" required value={details.email} onChange={set("email")} className="sm:col-span-2" />
                        )}
                        {index === 1 && (
                          <>
                            <Field label="First name" autoComplete="given-name" required value={details.firstName} onChange={set("firstName")} />
                            <Field label="Last name" autoComplete="family-name" required value={details.lastName} onChange={set("lastName")} />
                            <Field label="Address" autoComplete="address-line1" required value={details.address} onChange={set("address")} className="sm:col-span-2" />
                            <Field label="City" autoComplete="address-level2" required value={details.city} onChange={set("city")} />
                            <Field label="State or region" autoComplete="address-level1" required value={details.region} onChange={set("region")} />
                            <Field label="ZIP or postal code" autoComplete="postal-code" required value={details.postal} onChange={set("postal")} />
                            <label className="block">
                              <span className="c2-caps text-muted">Country</span>
                              <select className="c2-field" value={details.country} onChange={set("country")} autoComplete="country-name">
                                {["United States", "Canada", "United Kingdom", "United Arab Emirates", "Saudi Arabia", "Australia"].map((country) => (
                                  <option key={country}>{country}</option>
                                ))}
                              </select>
                            </label>
                          </>
                        )}
                        {index === 2 && (
                          <div className="sm:col-span-2">
                            {(
                              [
                                ["standard", "Standard", domestic ? "3 to 5 business days" : "7 to 12 business days", standard],
                                ["express", "Express", "1 to 2 business days", EXPRESS_SHIPPING],
                              ] as const
                            ).map(([id, label, time, price]) => (
                              <label key={id} className="flex cursor-pointer items-center gap-5 py-3">
                                <input
                                  type="radio"
                                  name="delivery"
                                  checked={delivery === id}
                                  onChange={() => setDelivery(id)}
                                  className="size-4 accent-[#4a0a10]"
                                />
                                <span className="flex-1">
                                  <span className="block text-base">{label}</span>
                                  <span className="block text-sm text-muted">{time}</span>
                                </span>
                                <span className="tabular-nums">{price === 0 ? "Free" : formatPrice(price)}</span>
                              </label>
                            ))}
                          </div>
                        )}
                        {index === 3 && (
                          <>
                            <Field label="Card number" inputMode="numeric" defaultValue="4242 4242 4242 4242" className="sm:col-span-2" />
                            <Field label="Expiry" defaultValue="12 / 29" />
                            <Field label="Security code" defaultValue="123" />
                            <p className="text-sm text-muted sm:col-span-2">
                              The card fields hold test values for this demonstration.
                            </p>
                          </>
                        )}
                        <div className="sm:col-span-2">
                          <button type="submit" className="c2-btn mt-2 w-full sm:w-auto">
                            {index === STEPS.length - 1
                              ? `Place demo order, ${formatPrice(subtotal + shipping)}`
                              : `Continue to ${STEPS[index + 1].toLowerCase()}`}
                          </button>
                        </div>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ol>
      </div>

      <aside className="lg:col-span-5 lg:col-start-8" aria-label="Order summary">
        <div className="bg-parchment p-6 md:p-10 lg:sticky lg:top-28">
          <h2 className="c2-h3 mb-4 italic">Your order</h2>
          <Summary lines={lines} subtotal={subtotal} shipping={shipping} />
        </div>
      </aside>
    </div>
  );
}

function Summary({ lines, subtotal, shipping }: { lines: CartLine[]; subtotal: number; shipping: number }) {
  return (
    <>
      <ul>
        {lines.map((line) => (
          <li key={line.key} className="flex items-center gap-5 py-3">
            <div className="relative aspect-[3/4] w-16 shrink-0 overflow-hidden bg-line">
              <Image src={line.image} alt="" fill sizes="64px" className="object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="c2-serif text-lg leading-tight">{line.name.replace(/^The /, "")}</p>
              <p className="text-sm text-muted">
                {[line.colour, line.size && sizeText(line.size), `Qty ${line.quantity}`].filter(Boolean).join(" / ")}
              </p>
            </div>
            <p className="tabular-nums">{formatPrice(line.price * line.quantity)}</p>
          </li>
        ))}
      </ul>
      <dl className="mt-5 space-y-2 border-t border-line pt-5">
        <div className="flex justify-between">
          <dt>Subtotal</dt>
          <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Shipping</dt>
          <dd className="tabular-nums">{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
        </div>
        <div className="flex items-baseline justify-between pt-3">
          <dt className="c2-caps">Total</dt>
          <dd className="text-2xl tabular-nums">{formatPrice(subtotal + shipping)}</dd>
        </div>
      </dl>
    </>
  );
}

function Field({
  label,
  className,
  ...input
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={cx("block", className)}>
      <span className="c2-caps text-muted">{label}</span>
      <input className="c2-field" {...input} />
    </label>
  );
}
