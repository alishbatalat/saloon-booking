import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getNote, notes } from "@/data/home";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return notes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) return { title: "Journal — Orielle" };
  return {
    title: `${note.title} — Orielle`,
    description: note.excerpt,
  };
}

export default async function JournalArticlePage({ params }: Props) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();

  const others = notes.filter((item) => item.slug !== note.slug);

  return (
    <>
      <article>
        <section className="relative flex min-h-[52vh] items-end overflow-hidden bg-night">
          <Image src={note.image} alt={note.alt} fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-black/45" />
          <div className="relative z-10 mx-auto w-full max-w-[900px] px-6 pb-16 pt-28 text-center text-white">
            <p className="mb-4 text-[12px] uppercase tracking-[0.34em]">
              {note.category}
              <span className="mx-2">/</span>
              {note.date}
            </p>
            <h1 className="font-serif text-4xl font-normal uppercase leading-tight tracking-tight md:text-6xl">{note.title}</h1>
          </div>
        </section>

        <div className="mx-auto max-w-[720px] px-6 py-16 md:py-24">
          <p className="font-serif text-2xl leading-snug text-ink md:text-3xl">{note.excerpt}</p>
          <div className="mt-10 space-y-6 leading-8">
            {note.content.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-3 border-t border-line pt-10">
            <Link
              href="/journal"
              className="inline-flex min-h-12 items-center justify-center border border-ink px-6 text-[12px] uppercase tracking-[0.18em] text-ink hover:bg-ink hover:text-white"
            >
              All notes
            </Link>
            <a
              href="/booking"
              className="inline-flex min-h-12 items-center justify-center border border-ink px-6 text-[12px] uppercase tracking-[0.18em] text-ink hover:bg-ink hover:text-white"
            >
              Book now
            </a>
          </div>
        </div>
      </article>

      {others.length ? (
        <section className="border-t border-line bg-stone">
          <div className="mx-auto max-w-[1100px] px-6 py-20">
            <h2 className="font-serif text-3xl uppercase tracking-tight text-ink">More notes</h2>
            <div className="mt-10 grid gap-8 md:grid-cols-2">
              {others.map((item) => (
                <Link key={item.slug} href={`/journal/${item.slug}`} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden bg-white">
                    <Image src={item.image} alt={item.alt} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(min-width: 768px) 50vw, 100vw" />
                  </div>
                  <p className="mt-4 text-[11px] uppercase tracking-[0.2em]">
                    {item.category}
                    <span className="mx-2">/</span>
                    {item.date}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl text-ink group-hover:text-bronze">{item.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
