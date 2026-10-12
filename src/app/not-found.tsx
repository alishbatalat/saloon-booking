import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-[800px] flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-[12px] uppercase tracking-[0.28em] text-bronze">404</p>
      <h1 className="mt-4 font-serif text-5xl uppercase tracking-tight text-ink md:text-6xl">Page not found</h1>
      <p className="mt-5 leading-8">That URL is not in the book. Try the home page, the menu, or book a chair.</p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex min-h-12 items-center justify-center border border-ink px-8 text-[12px] uppercase tracking-[0.22em] text-ink btn-fill"
        >
          Home
        </Link>
        <Link
          href="/booking"
          className="inline-flex min-h-12 items-center justify-center border border-ink px-8 text-[12px] uppercase tracking-[0.22em] text-ink btn-fill"
        >
          Book now
        </Link>
      </div>
    </section>
  );
}
