import type { Metadata } from "next";
import { C2Checkout } from "@/components/site/C2Checkout";

export const metadata: Metadata = { title: "Checkout" };

export default function ConceptTwoCheckout() {
  return (
    <div className="c2-shell pb-24 md:pb-36">
      <C2Checkout />
    </div>
  );
}
