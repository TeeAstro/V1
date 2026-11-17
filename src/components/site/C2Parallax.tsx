"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

interface Props {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
}

/** A photograph that drifts slightly slower than the page as it scrolls past. */
export function C2Parallax({ src, alt, className, imageClassName }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className ?? ""}`}>
      <motion.div className="absolute inset-[-8%_0]" style={reduced ? undefined : { y }}>
        <Image src={src} alt={alt} fill sizes="100vw" className={`object-cover ${imageClassName ?? ""}`} />
      </motion.div>
    </div>
  );
}
