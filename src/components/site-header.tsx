"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { menuGroups } from "@/data/home";

type NavChild = { label: string; href: string };

const serviceChildren: NavChild[] = menuGroups.map((group) => ({
  label: group.title,
  href: `/menu#${group.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
}));

const homeChildren: NavChild[] = [
  { label: "Beauty Center", href: "/" },
  { label: "Nail Salon", href: "/home/nail-salon" },
  { label: "Hair Salon", href: "/home/hair-salon" },
  { label: "Hair Lounge", href: "/home/hair-lounge" },
  { label: "Nail Studio", href: "/home/nail-studio" },
  { label: "Hair Art Studio", href: "/home/hair-art" },
  { label: "Skincare Center", href: "/home/skincare" },
  { label: "Nail Care Center", href: "/home/nail-care" },
  { label: "Beauty Salon", href: "/home/beauty-salon" },
  { label: "Barber Shop #1", href: "/home/barber-1" },
  { label: "Hair Studio", href: "/home/hair-studio" },
  { label: "Barber Shop #2", href: "/home/barber-2" },
];

const pagesChildren: NavChild[] = [
  { label: "About Salon", href: "/studio" },
  { label: "Salon Menu", href: "/menu" },
  { label: "Barbershop", href: "/barbershop" },
  { label: "Gift Cards", href: "/gift-cards" },
  { label: "Artists + Staff", href: "/team" },
  { label: "Gallery Page", href: "/gallery" },
  { label: "Journal", href: "/journal" },
  { label: "Booking Page", href: "/booking" },
  { label: "Contact Us", href: "/contact" },
  { label: "Our Locations", href: "/locations" },
  { label: "Faqs Page", href: "/faq" },
];

const simpleLinks = [
  { label: "Portfolio", href: "/gallery" },
  { label: "Blog", href: "/journal" },
] as const;

const drawerSlide = {
  type: "spring" as const,
  stiffness: 320,
  damping: 32,
};

/** Staggered "burger → slide-in menu" reveal (dev.to/webdeasy "35 CSS Menus": Burger Animation + Slide In Menu) */
const drawerListVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.16 },
  },
};

const drawerItemVariants = {
  hidden: { opacity: 0, x: 26 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

/** Reine hover dropdown — Beauty Center + Home / Pages suboptions */
function HoverDropdown({
  label,
  items,
  align = "left",
}: {
  label: string;
  items: NavChild[];
  align?: "left" | "right";
}) {
  return (
    <div className="nav-dd">
      <button type="button" className="nav-dd__trigger" aria-haspopup="true">
        {label}
        <span className="nav-dd__chevron" aria-hidden>
          ▼
        </span>
      </button>
      <div className={`nav-dd__panel${align === "right" ? " nav-dd__panel--right" : ""}`}>
        <ul>
          {items.map((child) => (
            <li key={child.href + child.label} className="nav-dd__item">
              <a href={child.href} className="nav-dd__link">
                {child.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Self-contained CSS menu for Services — fade/slide panel with a per-row sliding accent bar (keeps its own svc-menu__* classes, isolated from .nav-dd). */
function ServicesMenu({ label, items }: { label: string; items: NavChild[] }) {
  return (
    <div className="svc-menu">
      <button type="button" className="svc-menu__trigger" aria-haspopup="true">
        {label}
        <span className="svc-menu__chevron" aria-hidden>
          ▼
        </span>
      </button>
      <div className="svc-menu__panel">
        <ul>
          {items.map((child) => (
            <li key={child.href + child.label} className="svc-menu__item">
              <a href={child.href} className="svc-menu__link">
                {child.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <a href="/" onClick={onClick} className="text-ink">
      <span className="block font-serif text-[30px] leading-none tracking-[0.12em]">ORIELLE</span>
      <span className="mt-1 block text-[10px] uppercase tracking-[0.36em] text-ink">Beauty Studio</span>
    </a>
  );
}

/** Mobile drawer row: tap opens; on devices with hover, mouse enter also opens */
function DrawerHoverItem({
  label,
  items,
  open,
  onOpen,
  onClose,
  onNavigate,
}: {
  label: string;
  items: NavChild[];
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onNavigate: () => void;
}) {
  return (
    <motion.li variants={drawerItemVariants} className="border-b border-line" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <button
        type="button"
        className="flex w-full items-center justify-between px-5 py-4 text-left text-[15px] uppercase tracking-[0.06em] text-[#666] transition hover:bg-black/[0.04] hover:text-ink"
        aria-expanded={open}
        onClick={() => (open ? onClose() : onOpen())}
      >
        {label}
        <span
          className={`text-[10px] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden
        >
          ▼
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="overflow-hidden bg-stone/50"
          >
            {items.map((child, index) => (
              <motion.li
                key={child.href + child.label}
                className="border-t border-line/80"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.22, delay: index * 0.035, ease: "easeOut" }}
              >
                <a
                  href={child.href}
                  onClick={onNavigate}
                  className="block px-5 py-3 pl-7 text-[13px] uppercase tracking-[0.08em] text-[#555] transition duration-300 hover:translate-x-1.5 hover:bg-[#e7e7e7] hover:pl-9 hover:text-bronze active:scale-[0.98]"
                >
                  {child.label}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </motion.li>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [drawerHover, setDrawerHover] = useState<"home" | "services" | "pages" | null>(null);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) setDrawerHover(null);
  }, [menuOpen]);

  function closeMenu() {
    setDrawerHover(null);
    setMenuOpen(false);
  }

  return (
    <>
      <header className="sticky top-0 z-40 overflow-visible border-b border-line/70 bg-white">
        <div className="mx-auto flex h-[88px] max-w-[1400px] items-center justify-between gap-6 overflow-visible px-5 md:px-10">
          <Logo onClick={closeMenu} />

          {/* Desktop: Home · Services · Pages · Portfolio · Blog · Book Online */}
          <nav className="hidden items-center gap-1 overflow-visible lg:flex" aria-label="Main">
            <HoverDropdown label="Home" items={homeChildren} />
            <ServicesMenu label="Services" items={serviceChildren} />
            <HoverDropdown label="Pages" items={pagesChildren} />
            {simpleLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-2.5 py-2 text-[12px] uppercase tracking-[0.16em] text-ink/70 transition hover:text-ink"
              >
                {link.label}
              </a>
            ))}
            <a href="/booking" className="nav-book">
              Book Online
            </a>
          </nav>

          <button
            type="button"
            className="relative h-11 w-11 shrink-0"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span
              className={`absolute left-2.5 right-2.5 h-px bg-ink transition-[top,transform] duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] ${menuOpen ? "top-1/2 rotate-45" : "top-[15px]"}`}
            />
            <span
              className={`absolute left-2.5 right-2.5 top-1/2 h-px origin-center bg-ink transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.65,0,0.35,1)] ${menuOpen ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"}`}
            />
            <span
              className={`absolute left-2.5 right-2.5 h-px bg-ink transition-[bottom,transform] duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] ${menuOpen ? "top-1/2 -rotate-45" : "bottom-[15px]"}`}
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <>
            <motion.button
              type="button"
              aria-label="Close menu overlay"
              className="fixed inset-0 z-50 bg-black/55"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
            />

            <motion.aside
              className="fixed inset-y-0 right-0 z-[60] h-dvh w-[min(100vw,380px)] overflow-hidden bg-white shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={drawerSlide}
            >
              <div className="flex h-[88px] shrink-0 items-center justify-between border-b border-line px-6">
                <button type="button" className="relative h-10 w-10" aria-label="Close menu" onClick={closeMenu}>
                  <span className="absolute left-2 right-2 top-1/2 h-px rotate-45 bg-ink/70" />
                  <span className="absolute left-2 right-2 top-1/2 h-px -rotate-45 bg-ink/70" />
                </button>
                <Logo onClick={closeMenu} />
              </div>

              <nav className="min-h-0 flex-1 overflow-y-auto">
                <motion.ul variants={drawerListVariants} initial="hidden" animate="visible">
                  <DrawerHoverItem
                    label="Home"
                    items={homeChildren}
                    open={drawerHover === "home"}
                    onOpen={() => setDrawerHover("home")}
                    onClose={() => setDrawerHover(null)}
                    onNavigate={closeMenu}
                  />
                  <DrawerHoverItem
                    label="Services"
                    items={serviceChildren}
                    open={drawerHover === "services"}
                    onOpen={() => setDrawerHover("services")}
                    onClose={() => setDrawerHover(null)}
                    onNavigate={closeMenu}
                  />
                  <DrawerHoverItem
                    label="Pages"
                    items={pagesChildren}
                    open={drawerHover === "pages"}
                    onOpen={() => setDrawerHover("pages")}
                    onClose={() => setDrawerHover(null)}
                    onNavigate={closeMenu}
                  />
                  {simpleLinks.map((link) => (
                    <motion.li key={link.href} variants={drawerItemVariants} className="border-b border-line">
                      <a
                        href={link.href}
                        onClick={closeMenu}
                        className="block px-5 py-4 text-[15px] uppercase tracking-[0.06em] text-[#666] hover:bg-black/[0.04] hover:text-ink"
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                  <motion.li variants={drawerItemVariants} className="border-b border-line px-5 py-4">
                    <a href="/booking" onClick={closeMenu} className="nav-book nav-book--drawer">
                      Book Online
                    </a>
                  </motion.li>
                </motion.ul>
              </nav>

              <div className="shrink-0 border-t border-line px-5 py-5 text-sm leading-7">
                <p className="text-[11px] uppercase tracking-[0.2em] text-bronze">Visit</p>
                <p className="mt-2 text-ink">
                  Wilshire · (323) 555-0148
                  <br />
                  Silver Lake · (323) 555-0194
                </p>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
