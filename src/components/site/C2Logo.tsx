import { cx } from "@/utils/format";

const mask = {
  maskImage: "url(/brand/athar-mark.png)",
  WebkitMaskImage: "url(/brand/athar-mark.png)",
  maskSize: "contain",
  WebkitMaskSize: "contain",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
  maskPosition: "center",
  WebkitMaskPosition: "center",
} as const;

/** The official calligraphic mark from /public/brand, tinted with the current colour. */
export function C2Mark({ className }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="Athar, written in Arabic calligraphy"
      className={cx("block aspect-[767/560] bg-current", className)}
      style={mask}
    />
  );
}

/** Horizontal lockup: mark, then wordmark. */
export function C2Logo({ className, markClassName }: { className?: string; markClassName?: string }) {
  return (
    <span className={cx("flex items-center gap-3", className)}>
      <C2Mark className={cx("w-9 shrink-0 md:w-11", markClassName)} />
      <span className="c2-serif whitespace-nowrap max-[399px]:sr-only text-[0.7rem] uppercase tracking-[0.26em] sm:text-[0.78rem] sm:tracking-[0.34em] md:text-[0.84rem]">
        Athar Thobes
      </span>
    </span>
  );
}
