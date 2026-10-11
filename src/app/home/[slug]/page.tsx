import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { HomeView } from "@/components/home-view";
import { getHomeDemo, homeDemos } from "@/data/home-demos";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return homeDemos.filter((demo) => demo.slug !== "beauty-center").map((demo) => ({ slug: demo.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const demo = getHomeDemo(slug);
  if (!demo || demo.slug === "beauty-center") return { title: "Orielle" };
  return {
    title: `${demo.label} — Orielle`,
    description: demo.subtitle,
  };
}

export default async function HomeDemoPage({ params }: Props) {
  const { slug } = await params;
  const demo = getHomeDemo(slug);
  if (!demo || demo.slug === "beauty-center") notFound();
  return <HomeView demo={demo} />;
}
