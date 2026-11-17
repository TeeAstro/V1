import Link from "next/link";
import { C2 } from "./links";

export function C2Footer() {
  return (
    <footer className="on-dark overflow-hidden bg-oxblood pt-20 text-ivory md:pt-28">
      <div className="c2-shell flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <nav aria-label="Footer" className="c2-caps flex flex-wrap gap-x-10 gap-y-4">
          <Link href={C2.thobe} className="c2-link">Thobes</Link>
          <Link href={C2.shirt} className="c2-link">Shirts</Link>
          <Link href={C2.hat} className="c2-link">Hats</Link>
          <Link href={C2.story} className="c2-link">Our story</Link>
          <a href="mailto:hello@atharthobes.com" className="c2-link">Contact</a>
        </nav>
        <p className="max-w-xs text-blush md:text-right">
          Minneapolis, Minnesota. Free shipping in the United States, and delivery worldwide.
        </p>
      </div>

      {/* The wordmark, set as wide as the page. */}
      <p
        aria-hidden
        className="c2-serif mt-14 select-none whitespace-nowrap text-center text-[12.6vw] uppercase leading-[0.8] tracking-[-0.01em] text-blush/25 md:mt-20"
      >
        Athar Thobes
      </p>

      <div className="relative bg-oxblood">
        <div className="c2-shell c2-caps flex flex-col gap-3 py-6 text-blush md:flex-row md:justify-between">
          <span>Est. 2026</span>
          <span>Prototype storefront. No orders are taken.</span>
        </div>
      </div>
    </footer>
  );
}
