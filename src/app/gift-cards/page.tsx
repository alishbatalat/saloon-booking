import type { Metadata } from "next";

import { GiftCardsView } from "@/components/gift-cards-view";

export const metadata: Metadata = {
  title: "Gift cards — Orielle",
  description: "Request an Orielle gift card for Wilshire or Silver Lake.",
};

export default function GiftCardsPage() {
  return <GiftCardsView />;
}
