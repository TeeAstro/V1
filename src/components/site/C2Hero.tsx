"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { C2Mark } from "./C2Logo";
import { C2 } from "./links";

const ease = [0.22, 1, 0.36, 1] as const;

/** Time the oxblood opening takes before the photograph is revealed. */
const INTRO = 2.1;

/** Each headline line rises out of a mask, one after the other. */
function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.12em]">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.2, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/**
 * The opening: an oxblood field on which the calligraphic mark is written
 * right to left, the way it is drawn by hand. The field then lifts to show
 * the photograph, and the headline rises.
 */
export function C2Hero() {
  const reduced = useReducedMotion();
  const start = reduced ? 0 : INTRO;

  return (
    <section className="relative -mt-[var(--c2-nav-h)] h-[100svh] min-h-[36rem] overflow-hidden bg-faint text-ivory">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.8, delay: start * 0.8, ease }}
      >
        <Image
          src="/images/c2/hero-desert.jpg"
          alt="A man in a white thobe walking alone across a sand dune"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_64%]"
        />
      </motion.div>

      <div className="c2-shell relative flex h-full flex-col justify-end pb-10 md:pb-14">
        <h1 className="c2-display">
          <Line delay={start + 0.15}>Leave</Line>
          <Line delay={start + 0.3}>
            <span className="italic">a trace.</span>
          </Line>
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: start + 1.1 }}
          className="mt-8 md:mt-10"
        >
          <div className="c2-caps flex gap-9">
            <Link href={C2.thobe} className="c2-link c2-link-on">Thobes</Link>
            <Link href={C2.shirt} className="c2-link c2-link-on">Shirts</Link>
            <Link href={C2.hat} className="c2-link c2-link-on">Hats</Link>
          </div>
        </motion.div>
      </div>

      {!reduced && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-50 grid place-items-center bg-oxblood text-blush"
          initial={{ y: 0 }}
          animate={{ y: "-100%" }}
          transition={{ duration: 1.1, delay: INTRO - 0.35, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            initial={{ clipPath: "inset(0 0 0 100%)" }}
            animate={{ clipPath: "inset(0 0 0 0%)" }}
            transition={{ duration: 1.4, delay: 0.15, ease }}
          >
            <C2Mark className="w-44 md:w-64" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
