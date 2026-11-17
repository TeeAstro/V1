"use client";

import { cx } from "@/utils/format";
import type { ProductColour } from "@/utils/types";

interface Props {
  colours: ProductColour[];
  selected: string;
  onSelect: (colour: ProductColour) => void;
  size?: "sm" | "md";
  /** Ring offset colour, to match the surface the swatches sit on. */
  surface?: string;
}

/** Round colour swatches, used on the homepage and the product page. */
export function Swatches({ colours, selected, onSelect, size = "md", surface = "ring-offset-ivory" }: Props) {
  return (
    <div className={cx("flex flex-wrap", size === "sm" ? "gap-2.5" : "gap-3.5")}>
      {colours.map((colour) => (
        <button
          key={colour.name}
          type="button"
          onClick={() => onSelect(colour)}
          aria-label={colour.name}
          aria-pressed={colour.name === selected}
          title={colour.name}
          className={cx(
            "rounded-full border border-ink/15 transition-shadow duration-300",
            size === "sm" ? "size-5" : "size-8",
            colour.name === selected && cx("ring-1 ring-oxblood", size === "sm" ? "ring-offset-[3px]" : "ring-offset-[5px]", surface),
          )}
          style={{ backgroundColor: colour.hex }}
        />
      ))}
    </div>
  );
}
