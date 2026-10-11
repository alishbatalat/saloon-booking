import { images } from "@/data/home";

export type HomeDemo = {
  slug: string;
  label: string;
  href: string;
  title: string;
  subtitle: string;
  eyebrow: string;
  heroImage: string;
  heroAlt: string;
  /** When set, hero uses a sliding image carousel (Nail Care Center style). */
  heroSlides?: { src: string; alt: string }[];
  heroEyebrow?: string;
  aboutTitle: string;
  aboutCopy: string;
  focusLabel: string;
  focusItems: [string, string, string][];
};

export const homeDemos: HomeDemo[] = [
  {
    slug: "beauty-center",
    label: "Beauty Center",
    href: "/",
    title: "Welcome to Orielle Studio",
    subtitle: "Your one stop beauty shop",
    eyebrow: "Mind, hair, and ritual",
    heroImage: images.hero,
    heroAlt: "Orielle beauty studio",
    aboutTitle: "Your secret place of grooming",
    aboutCopy:
      "Orielle opened in 2016 as a room that refused to split the salon from the barbershop. The same standard sits in both chairs: a consultation, a precise cut, and enough quiet to hear yourself think.",
    focusLabel: "Beauty Center",
    focusItems: [
      ["01", "Full room", "Cuts, color, barber chairs, makeup, and nails under one book."],
      ["02", "Two studios", "Wilshire for the full menu. Silver Lake for cuts, color, and fades."],
      ["03", "Book online", "Choose a studio, a service, and a chair in a few minutes."],
    ],
  },
  {
    slug: "nail-salon",
    label: "Nail Salon",
    href: "/home/nail-salon",
    title: "Nail care at Orielle",
    subtitle: "Gel, shape, and unhurried polish",
    eyebrow: "Wilshire nails",
    heroImage: images.nails,
    heroAlt: "Manicure at Orielle",
    aboutTitle: "Quiet hands, clean finish",
    aboutCopy:
      "Nails stay at Wilshire — shaping, cuticle care, gel color, and spa pedicures. Book the table when you want the hour to feel slow.",
    focusLabel: "Nail Salon",
    focusItems: [
      ["01", "Gel manicure", "Shape, care, and a quiet shine cured to last."],
      ["02", "Spa pedicure", "Soak, polish, and an unhurried foot massage."],
      ["03", "Wilshire only", "The nail table lives behind the linen curtain on La Cienega."],
    ],
  },
  {
    slug: "hair-salon",
    label: "Hair Salon",
    href: "/home/hair-salon",
    title: "Hair salon, done carefully",
    subtitle: "Cuts, color, and finish",
    eyebrow: "Salon chairs",
    heroImage: images.cut,
    heroAlt: "Salon cut in progress",
    aboutTitle: "A cut that still looks like you",
    aboutCopy:
      "Signature cuts, blowouts, and event styles with a consultation first. Both studios keep the salon book — Wilshire and Silver Lake.",
    focusLabel: "Hair Salon",
    focusItems: [
      ["01", "Signature cut", "Consulted in the mirror and finished with a soft blowout."],
      ["02", "Blowout & style", "Smooth movement for dinners, fittings, and photographs."],
      ["03", "Event updo", "Pinned styles built to last a long evening — Wilshire."],
    ],
  },
  {
    slug: "hair-lounge",
    label: "Hair Lounge",
    href: "/home/hair-lounge",
    title: "The hair lounge",
    subtitle: "Color that survives week twelve",
    eyebrow: "Lived-in color",
    heroImage: images.color,
    heroAlt: "Lived-in blonde color",
    aboutTitle: "Dimension painted where the light hits",
    aboutCopy:
      "Balayage, root refresh, and gloss appointments mapped for grow-out — not only for the photograph in the chair.",
    focusLabel: "Hair Lounge",
    focusItems: [
      ["01", "Lived-in balayage", "Soft dimension that grows out without a hard line."],
      ["02", "Root refresh", "Regrowth blended back into your existing color."],
      ["03", "Gloss & tone", "Shine and tone without a full color sitting."],
    ],
  },
  {
    slug: "nail-studio",
    label: "Nail Studio",
    href: "/home/nail-studio",
    title: "Orielle nail studio",
    subtitle: "Manicure and pedicure rituals",
    eyebrow: "The nail table",
    heroImage: images.nails,
    heroAlt: "Nail studio finish",
    aboutTitle: "A small room for careful hands",
    aboutCopy:
      "Gel manicures and spa pedicures at Wilshire only. Ask for Sofia when you want nails booked with makeup on the same visit.",
    focusLabel: "Nail Studio",
    focusItems: [
      ["01", "Gel color", "Cured polish that keeps a quiet shine."],
      ["02", "Pedicure hour", "Soak, shape, and massage without a rush."],
      ["03", "Pair with glam", "Makeup and nails share the Wilshire room."],
    ],
  },
  {
    slug: "hair-art",
    label: "Hair Art Studio",
    href: "/home/hair-art",
    title: "Hair art studio",
    subtitle: "Shape, texture, and finish",
    eyebrow: "Creative cuts",
    heroImage: images.finish,
    heroAlt: "Finished salon cut",
    aboutTitle: "Cut as craft, not a trend chase",
    aboutCopy:
      "Amara and Noah take the cuts that need a longer consult — length change, texture, and a finish you can live with on a Tuesday.",
    focusLabel: "Hair Art",
    focusItems: [
      ["01", "Consultation first", "We decide the shape before the scissors move."],
      ["02", "Texture kept", "Movement left where it belongs on your head."],
      ["03", "Finish that lasts", "A blowout that still makes sense the next morning."],
    ],
  },
  {
    slug: "skincare",
    label: "Skincare Center",
    href: "/home/skincare",
    title: "Skin & scalp rituals",
    subtitle: "Treatments that stay quiet",
    eyebrow: "Scalp & smooth",
    heroImage: images.salon,
    heroAlt: "Salon treatment room",
    aboutTitle: "Care between the cuts",
    aboutCopy:
      "Scalp rituals and smoothing appointments for hair that needs rest — humidity-resistant finish without a hard chemical story.",
    focusLabel: "Skincare",
    focusItems: [
      ["01", "Scalp ritual", "Cleanse, massage, and serum for a tired scalp."],
      ["02", "Smoothing ritual", "A humidity-resistant smooth-down that keeps the cut’s shape."],
      ["03", "Book Wilshire", "Longer treatments stay on the Wilshire book."],
    ],
  },
  {
    slug: "nail-care",
    label: "Nail Care Center",
    href: "/home/nail-care",
    title: "Make your day shine with your shiny nails",
    subtitle: "Clean shape, lasting polish, and an hour that is not a hurry.",
    eyebrow: "Hands & feet",
    heroImage: images.nails,
    heroAlt: "Nail care detail",
    heroEyebrow: "Fresh, shiny, bright",
    heroSlides: [
      { src: images.nails, alt: "Gel manicure finish at Orielle" },
      { src: images.makeup, alt: "Soft glam with polished nails" },
      { src: images.portrait, alt: "Studio portrait after nail care" },
      { src: images.salon, alt: "Wilshire nail table and salon floor" },
    ],
    aboutTitle: "Care that does not shout",
    aboutCopy:
      "Cuticle work, shaping, and gel that looks finished without looking loud. Pedicures keep the same pace.",
    focusLabel: "Nail Care",
    focusItems: [
      ["01", "Nail care", "Shape and cuticle work before color goes on."],
      ["02", "Nail art", "Quiet accents or a stronger look when you want it."],
      ["03", "Treatments", "Spa pedicures and add-ons booked at Wilshire."],
    ],
  },
  {
    slug: "beauty-salon",
    label: "Beauty Salon",
    href: "/home/beauty-salon",
    title: "Beauty salon",
    subtitle: "Hair, makeup, and nails",
    eyebrow: "Full beauty",
    heroImage: images.makeup,
    heroAlt: "Soft glam makeup",
    aboutTitle: "The Wilshire beauty room",
    aboutCopy:
      "Soft glam, bridal makeup, gel nails, and salon chairs in one address. Book the services that belong together on the same day.",
    focusLabel: "Beauty Salon",
    focusItems: [
      ["01", "Soft glam", "Skin that looks like skin, with a stronger eye or lip if you want it."],
      ["02", "Bridal makeup", "A trial-informed wedding face, set for a long day."],
      ["03", "Salon + nails", "Cut or color upstairs, polish at the table."],
    ],
  },
  {
    slug: "barber-1",
    label: "Barber Shop #1",
    href: "/home/barber-1",
    title: "Barbershop Wilshire",
    subtitle: "Fades, shaves, and the classic cut",
    eyebrow: "Gentlemen’s chairs",
    heroImage: images.barber,
    heroAlt: "Barber at Wilshire",
    aboutTitle: "The chairs at the back of Wilshire",
    aboutCopy:
      "Julien keeps the Wilshire barber book — classic cuts, skin fades, hot-towel shaves, and beards with a proper outline.",
    focusLabel: "Barber Shop",
    focusItems: [
      ["01", "Classic cut", "Scissor and clipper work with a natural taper."],
      ["02", "Hot towel shave", "Steam, oil, razor — never rushed."],
      ["03", "Cut & beard", "Haircut and sculpt booked as one sitting."],
    ],
  },
  {
    slug: "hair-studio",
    label: "Hair Studio",
    href: "/home/hair-studio",
    title: "Hair studio Silver Lake",
    subtitle: "Cuts and color on Sunset",
    eyebrow: "Silver Lake",
    heroImage: images.silverLake,
    heroAlt: "Silver Lake studio",
    aboutTitle: "The smaller shop, the same book",
    aboutCopy:
      "Noah and Iris hold the Silver Lake salon chairs — cuts, gloss, and lived-in color with Saturdays that open an hour earlier.",
    focusLabel: "Hair Studio",
    focusItems: [
      ["01", "Saturday early", "Silver Lake opens at 9:00 AM on Saturdays."],
      ["02", "Cuts & gloss", "Signature cuts and tone work on Sunset."],
      ["03", "Color that lasts", "Balayage mapped for week twelve."],
    ],
  },
  {
    slug: "barber-2",
    label: "Barber Shop #2",
    href: "/home/barber-2",
    title: "Barbershop Silver Lake",
    subtitle: "Fades that still look sharp on Friday",
    eyebrow: "Sunset chairs",
    heroImage: images.fade,
    heroAlt: "Skin fade at Silver Lake",
    aboutTitle: "Mateo’s chair on Sunset",
    aboutCopy:
      "Skin fades, scissor cuts, and father-and-son sits in the quieter Silver Lake shop. The street is loud; the chair is not.",
    focusLabel: "Barber Shop",
    focusItems: [
      ["01", "Skin fade", "A close fade blended into the length you keep."],
      ["02", "Father & son", "Two cuts, back to back, same barber."],
      ["03", "Beard sculpt", "Cheek lines and neckline restored with a razor finish."],
    ],
  },
];

export function getHomeDemo(slug: string) {
  return homeDemos.find((demo) => demo.slug === slug);
}
