"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/** Scroll-linked parallax image: moves slower than the page so it reads as "fixed" in place, reliably across browsers (unlike CSS background-attachment: fixed). */
export function ParallaxBackground({ src, alt }: { src: string; alt: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-18%", "18%"]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-x-0 -top-[18%] -bottom-[18%] bg-cover bg-center"
        style={{ backgroundImage: `url(${src})`, y }}
        role="img"
        aria-label={alt}
      />
    </div>
  );
}
