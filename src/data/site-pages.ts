export type SitePage = {
  title: string;
  href: string;
  description: string;
  keywords: string[];
};

export const sitePages: SitePage[] = [
  {
    title: "Home",
    href: "/",
    description: "The Orielle homepage — an overview of the salon and barbershop, featured services, and both studios.",
    keywords: ["home", "homepage", "main page", "start"],
  },
  {
    title: "Book an appointment",
    href: "/booking",
    description: "A 5-step booking wizard: choose a studio, a service, an artist, a time, then your details. You get a reference code and pay at the studio.",
    keywords: ["book", "booking", "appointment", "reserve", "reservation", "schedule", "slot", "time"],
  },
  {
    title: "The Studio",
    href: "/studio",
    description: "About Orielle — what the studio is, its approach, and the two Los Angeles locations.",
    keywords: ["studio", "about", "who are you", "story", "philosophy"],
  },
  {
    title: "The Menu",
    href: "/menu",
    description: "Full salon and barbershop service menu with prices: cuts, color, shaves, makeup, and nails.",
    keywords: ["menu", "services", "service", "price", "prices", "pricing", "cost", "how much", "cut", "color", "makeup", "nails"],
  },
  {
    title: "Barbershop",
    href: "/barbershop",
    description: "Barbershop services — cuts, fades, hot-towel shaves, and beard work — at both studios.",
    keywords: ["barbershop", "barber", "fade", "shave", "beard", "men's cut", "mens cut"],
  },
  {
    title: "Gift Cards",
    href: "/gift-cards",
    description: "Request an Orielle gift card for either studio.",
    keywords: ["gift card", "gift cards", "voucher", "present", "gift"],
  },
  {
    title: "Artists + Staff",
    href: "/team",
    description: "Meet the artists and stylists working at Wilshire and Silver Lake.",
    keywords: ["team", "staff", "artist", "artists", "stylist", "stylists", "who cuts", "barber name"],
  },
  {
    title: "Gallery",
    href: "/gallery",
    description: "Photographs from the Orielle salon and barbershop rooms.",
    keywords: ["gallery", "photos", "pictures", "images", "portfolio"],
  },
  {
    title: "Journal",
    href: "/journal",
    description: "Notes and articles from Orielle on color, the barbershop chair, and studio life.",
    keywords: ["journal", "blog", "articles", "notes", "news"],
  },
  {
    title: "Contact Us",
    href: "/contact",
    description: "Reach the front desk at Wilshire or Silver Lake, or send a message with a question.",
    keywords: ["contact", "email", "phone", "call", "message", "reach you", "get in touch"],
  },
  {
    title: "Our Locations",
    href: "/locations",
    description: "Both Orielle studios: Wilshire in Beverly Grove and Silver Lake on Sunset Boulevard, with addresses and hours.",
    keywords: ["location", "locations", "address", "where", "directions", "wilshire", "silver lake", "studio address", "hours", "open"],
  },
  {
    title: "FAQs",
    href: "/faq",
    description: "Answers about booking, artists, cancellations, gift cards, and the studios.",
    keywords: ["faq", "faqs", "question", "questions", "help", "policy", "cancel", "cancellation", "reschedule"],
  },
];
