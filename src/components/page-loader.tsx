"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/** Full-screen overlay with a spinning ring and a pulsing wordmark, shown while navigating to another page. */
export function PageLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as HTMLElement)?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.origin !== window.location.origin) return;
      if (href === window.location.pathname + window.location.search) return;

      setVisible(true);
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    setVisible(false);
  }, [pathname]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="page-loader"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-6 bg-white/92 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <div className="relative flex h-16 w-16 items-center justify-center">
            <motion.span
              className="absolute inset-0 rounded-full border border-bronze/20"
              animate={{ scale: [1, 1.35], opacity: [0.5, 0] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: "easeOut" }}
            />
            <motion.svg
              viewBox="0 0 48 48"
              className="h-12 w-12 text-bronze"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.1, ease: "linear" }}
            >
              <circle cx="24" cy="24" r="19" fill="none" stroke="currentColor" strokeWidth="2" strokeOpacity="0.16" />
              <circle
                cx="24"
                cy="24"
                r="19"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="34 85"
              />
            </motion.svg>
            <span className="absolute font-serif text-base italic text-ink">O</span>
          </div>

          <motion.span
            className="font-serif text-[13px] uppercase tracking-[0.42em] text-ink"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          >
            Orielle
          </motion.span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
