import { bookingServices } from "@/data/booking";
import { homeDemos } from "@/data/home-demos";
import { hours, locations } from "@/data/home";
import { durationLabel, money } from "@/lib/booking-format";
import { sitePages } from "@/data/site-pages";

export type ChatLink = { label: string; href: string };
export type ChatReply = { text: string; links: ChatLink[] };

type Option = {
  title: string;
  href: string;
  description: string;
  keywords: string[];
};

const STOPWORDS = new Set(["the", "a", "an", "and", "of", "to", "for", "your", "our"]);

function buildKeywords(title: string) {
  const clean = title.toLowerCase().replace(/&/g, " ").replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
  const words = clean.split(" ").filter((word) => word && !STOPWORDS.has(word));
  const bigrams: string[] = [];
  for (let index = 0; index < words.length - 1; index += 1) {
    bigrams.push(`${words[index]} ${words[index + 1]}`);
  }
  return [clean, ...bigrams, ...words];
}

const pageOptions: Option[] = sitePages.map((page) => ({
  title: page.title,
  href: page.href,
  description: page.description,
  keywords: [...page.keywords, ...buildKeywords(page.title)],
}));

const serviceOptions: Option[] = bookingServices.map((service) => ({
  title: service.name,
  href: `/booking?service=${service.id}`,
  description: `${service.summary} ${service.category === "salon" ? "Salon" : "Barbershop"} service — ${durationLabel(service.duration)}, ${money(service.price, service.priceMax)}.`,
  keywords: buildKeywords(service.name),
}));

const homeStyleOptions: Option[] = homeDemos
  .filter((demo) => demo.slug !== "beauty-center")
  .map((demo) => ({
    title: demo.label,
    href: demo.href,
    description: demo.subtitle,
    keywords: buildKeywords(demo.label),
  }));

const allOptions: Option[] = [...pageOptions, ...serviceOptions, ...homeStyleOptions];

function normalize(input: string) {
  return input.toLowerCase().trim();
}

function scoreOption(option: Option, query: string) {
  let score = 0;
  if (query.includes(option.title.toLowerCase())) score += 4;
  for (const keyword of option.keywords) {
    if (!keyword) continue;
    if (query.includes(keyword)) score += keyword.includes(" ") ? 2 : 1;
  }
  return score;
}

function greetingMatch(query: string) {
  return /^(hi|hello|hey|yo|good morning|good afternoon|good evening)\b/.test(query);
}

function thanksMatch(query: string) {
  return /\b(thanks|thank you|thx|cheers)\b/.test(query);
}

function greetingReply(): ChatReply {
  return {
    text: "Hello! I can point you to any page on the Orielle site, explain a specific service (like \"what is balayage\"), or list everything we offer. What are you looking for?",
    links: [],
  };
}

function hoursReply(query: string): ChatReply | null {
  if (!/\bhour|open|close|when.*(open|close)\b/.test(query)) return null;
  const lines = hours.map(([day, time]) => `${day}: ${time}`).join(" · ");
  return {
    text: `Studio hours — ${lines}.`,
    links: [{ label: "Our Locations", href: "/locations" }],
  };
}

function locationsReply(query: string): ChatReply | null {
  if (!/\b(address|where|located|location|directions)\b/.test(query)) return null;
  const lines = locations.map((location) => `${location.name.replace("Visit ", "")}: ${location.address}`).join(" · ");
  return {
    text: `Orielle has two studios — ${lines}.`,
    links: [{ label: "Our Locations", href: "/locations" }],
  };
}

function servicesListReply(query: string): ChatReply | null {
  if (!/\b(all services|service list|list.*services|what.*(services|do you offer)|services.*(offer|have))\b/.test(query)) {
    return null;
  }
  const salon = bookingServices.filter((service) => service.category === "salon").map((service) => service.name);
  const barbershop = bookingServices.filter((service) => service.category === "barbershop").map((service) => service.name);
  return {
    text: `Salon: ${salon.join(", ")}.\n\nBarbershop: ${barbershop.join(", ")}.\n\nAsk about any one by name (e.g. "what is balayage") for the price and details, or see the full menu.`,
    links: [
      { label: "The Menu", href: "/menu" },
      { label: "Book an appointment", href: "/booking" },
    ],
  };
}

function homeStylesListReply(query: string): ChatReply | null {
  if (!/\b(home style|home styles|home pages|home variations|home options|home demos|home dropdown)\b/.test(query)) {
    return null;
  }
  const text = homeStyleOptions.map((option) => `${option.title} — ${option.description}`).join("\n\n");
  return { text, links: homeStyleOptions.map((option) => ({ label: option.title, href: option.href })) };
}

export function getChatReply(message: string): ChatReply {
  const query = normalize(message);
  if (!query) {
    return { text: "Ask me about a service, a studio, hours, or how to book.", links: [] };
  }

  if (greetingMatch(query)) {
    return greetingReply();
  }

  if (thanksMatch(query)) {
    return { text: "Happy to help! Anything else you'd like to know about Orielle?", links: [] };
  }

  const servicesList = servicesListReply(query);
  if (servicesList) return servicesList;

  const homeStylesList = homeStylesListReply(query);
  if (homeStylesList) return homeStylesList;

  const hoursAnswer = hoursReply(query);
  if (hoursAnswer) return hoursAnswer;

  const locationsAnswer = locationsReply(query);
  if (locationsAnswer) return locationsAnswer;

  const scored = allOptions
    .map((option) => ({ option, score: scoreOption(option, query) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length) {
    const topScore = scored[0].score;
    const top = scored.filter((entry) => entry.score >= topScore - 1).slice(0, 3);
    if (top.length === 1) {
      const { option } = top[0];
      return { text: `${option.title} — ${option.description}`, links: [{ label: option.title, href: option.href }] };
    }
    const text = top.map(({ option }) => `${option.title} — ${option.description}`).join("\n\n");
    return { text, links: top.map(({ option }) => ({ label: option.title, href: option.href })) };
  }

  return {
    text: "I'm not sure about that one. Here are the main places to look:",
    links: [
      { label: "The Menu", href: "/menu" },
      { label: "Book an appointment", href: "/booking" },
      { label: "Our Locations", href: "/locations" },
      { label: "FAQs", href: "/faq" },
    ],
  };
}
