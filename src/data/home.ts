export const images = {
  hero: "/images/hero.jpg",
  portrait: "/images/portrait.jpg",
  salon: "/images/salon.jpg",
  barber: "/images/barber.jpg",
  makeup: "/images/makeup.jpg",
  cut: "/images/cut.jpg",
  shop: "/images/shop.jpg",
  beard: "/images/beard.jpg",
  nails: "/images/nails.jpg",
  wilshire: "/images/wilshire.jpg",
  silverLake: "/images/silver-lake.jpg",
  color: "/images/color.jpg",
  fade: "/images/fade.jpg",
  finish: "/images/finish.jpg",
};

export const features = [
  ["01", "Certified artists", "Seven people, two rooms. Everyone on the book has a craft, not a rotation."],
  ["02", "Considered formulas", "Color is mixed for your hair and your week-twelve self, not for the photograph."],
  ["03", "Booked in minutes", "Choose a studio, a service, and a chair. Pay when you arrive."],
];

export const hours = [
  ["Monday – Friday", "10:00 AM – 7:00 PM"],
  ["Saturday", "10:00 AM – 5:00 PM"],
  ["Sunday", "11:00 AM – 4:00 PM"],
];

export const menu = [
  ["Signature Cut & Finish", "Salon · 75 min", "$95"],
  ["Lived-in Balayage", "Salon · 3 hours", "$220 – $340"],
  ["Gloss & Tone", "Salon · 45 min", "$85"],
  ["Soft Glam Makeup", "Salon · 1 hour", "$110"],
  ["Classic Cut", "Barbershop · 40 min", "$48"],
  ["Skin Fade", "Barbershop · 45 min", "$58"],
  ["Hot Towel Shave", "Barbershop · 40 min", "$50"],
  ["Cut & Beard", "Barbershop · 70 min", "$78"],
];

export const menuGroups = [
  {
    title: "Cutting & Styling",
    category: "Salon",
    items: [
      ["Signature Cut & Finish", "A tailored cut, consulted in the mirror and finished with a soft blowout.", "75 min", "$95"],
      ["Blowout & Style", "Smooth, brushed movement for dinners, fittings, and photographs.", "45 min", "$68"],
      ["Event Updo", "A pinned style designed to last through a long evening.", "75 min", "$145"],
    ],
  },
  {
    title: "Color",
    category: "Salon",
    items: [
      ["Lived-in Balayage", "Soft, grown-out dimension painted where the light actually hits. Starting price for shoulder-length hair.", "3 hours", "$220 – $340"],
      ["Root Refresh", "Regrowth blended back into your existing color.", "90 min", "$110"],
      ["Gloss & Tone", "A clear or tinted gloss that refreshes shine and cancels brass.", "45 min", "$85"],
    ],
  },
  {
    title: "Treatments & Makeup",
    category: "Salon · Wilshire",
    items: [
      ["Smoothing Ritual", "A humidity-resistant smooth-down that keeps your cut’s shape.", "2.5 hours", "$260"],
      ["Scalp Ritual", "A slow cleanse, massage, and serum for a tired scalp.", "45 min", "$70"],
      ["Soft Glam Makeup", "Skin that looks like skin, with a stronger eye or lip if you want it.", "60 min", "$110"],
      ["Bridal Makeup", "A trial-informed wedding face, set for a long day.", "75 min", "$175"],
      ["Gel Manicure", "Shaping, cuticle care, and a gel color cured to a quiet shine.", "50 min", "$52"],
      ["Spa Pedicure", "A soak, polish, and unhurried foot massage.", "60 min", "$72"],
    ],
  },
  {
    title: "Cuts",
    category: "Barbershop",
    items: [
      ["Classic Cut", "Scissor and clipper work with a natural, tapered finish.", "40 min", "$48"],
      ["Skin Fade", "A close fade blended into the length you keep on top.", "45 min", "$58"],
      ["Scissor Cut", "Length kept long enough to move, cut entirely with shears.", "45 min", "$55"],
      ["Father & Son", "Two cuts, back to back, with the same barber.", "75 min", "$88"],
    ],
  },
  {
    title: "Shave & Beard",
    category: "Barbershop",
    items: [
      ["Hot Towel Shave", "Steam, oil, and a straight-razor shave along the grain.", "40 min", "$50"],
      ["Beard Sculpt", "Cheek lines, neckline, and shape restored with a razor finish.", "30 min", "$35"],
      ["Cut & Beard", "Haircut and beard sculpt booked as one sitting.", "70 min", "$78"],
      ["Grey Blending", "A subtle blend through the temples and beard, never a flat dye.", "45 min", "$70"],
    ],
  },
];

export const gallery = [
  { src: images.cut, alt: "Stylist cutting long hair", caption: "Signature cut", tall: true },
  { src: images.barber, alt: "Barber at work", caption: "The gentlemen’s chair", tall: false },
  { src: images.makeup, alt: "Makeup application", caption: "Soft glam", tall: true },
  { src: images.shop, alt: "Barbershop interior", caption: "Silver Lake", tall: false },
];

export const galleryFull = [
  { src: images.cut, alt: "Stylist cutting long hair", caption: "Signature cut", tall: true },
  { src: images.barber, alt: "Barber at work", caption: "The gentlemen’s chair", tall: false },
  { src: images.makeup, alt: "Makeup application", caption: "Soft glam", tall: true },
  { src: images.shop, alt: "Barbershop interior", caption: "Silver Lake", tall: false },
  { src: images.nails, alt: "Manicured hands", caption: "Gel manicure", tall: false },
  { src: images.beard, alt: "Beard grooming", caption: "Beard sculpt", tall: true },
  { src: images.salon, alt: "Salon mirrors", caption: "Wilshire", tall: false },
  { src: images.finish, alt: "Finished men's haircut", caption: "Scissor cut", tall: false },
  { src: images.color, alt: "Lived-in blonde color", caption: "Balayage", tall: true },
  { src: images.fade, alt: "Skin fade haircut", caption: "Skin fade", tall: false },
  { src: images.portrait, alt: "Studio portrait", caption: "Soft glam", tall: false },
  { src: images.wilshire, alt: "Wilshire salon", caption: "The room", tall: true },
];

export const reviews = [
  {
    id: "claire",
    name: "Claire N.",
    service: "Lived-in Balayage",
    quote: "I stopped scheduling my life around my roots. The color grows out as if it were meant to, and the gloss between visits is twenty minutes of peace.",
  },
  {
    id: "marcus",
    name: "Marcus Hale",
    service: "Cut & Beard",
    quote: "My barber remembers the neckline without being asked. I book the same Tuesday, I sit down, and I leave looking like myself on a better day.",
  },
  {
    id: "elena",
    name: "Elena Cho",
    service: "Signature Cut",
    quote: "Six inches came off and it still felt like a small decision. Three weeks later it falls the way it did in the mirror.",
  },
  {
    id: "andre",
    name: "Andre Brooks",
    service: "Skin Fade",
    quote: "The fade is the first one I have had that still looks sharp on Friday. The shop on Sunset is calm, which I did not expect from the street.",
  },
];

export const locations = [
  {
    name: "Visit Wilshire",
    slug: "wilshire",
    neighborhood: "Beverly Grove",
    address: "418 N La Cienega Blvd, Los Angeles, CA 90048",
    phone: "(323) 555-0148",
    email: "wilshire@orielle.studio",
    image: images.wilshire,
    alt: "Wilshire salon interior",
    blurb:
      "The original room. Salon chairs along the window, two barber chairs at the back, and a makeup studio behind a linen curtain. Nails are only here.",
    services: ["Cuts & color", "Barber chairs", "Makeup", "Nails"],
    parking: "Lot behind the building with one hour validated.",
    mapEmbed:
      "https://www.openstreetmap.org/export/embed.html?bbox=-118.390%2C34.068%2C-118.360%2C34.086&layer=mapnik&marker=34.0766%2C-118.3764",
  },
  {
    name: "Visit Silver Lake",
    slug: "silver-lake",
    neighborhood: "Silver Lake",
    address: "2912 Sunset Blvd, Los Angeles, CA 90026",
    phone: "(323) 555-0194",
    email: "silverlake@orielle.studio",
    image: images.silverLake,
    alt: "Silver Lake studio mirrors",
    blurb:
      "A smaller shop with the same book. Strong on fades, scissor cuts, and lived-in color. Opens an hour earlier on Saturdays.",
    services: ["Cuts & color", "Barber chairs", "Hot towel shaves"],
    parking: "Metered street parking on Sunset. Sundays are easier.",
    mapEmbed:
      "https://www.openstreetmap.org/export/embed.html?bbox=-118.282%2C34.084%2C-118.252%2C34.102&layer=mapnik&marker=34.0928%2C-118.2672",
  },
];

export const notes = [
  {
    slug: "lived-in-color",
    category: "Color",
    date: "March 12, 2026",
    title: "How a balayage should look in week twelve",
    excerpt: "The appointment is a success when you forget the date of it. Notes on grow-out, toner, and why we refuse a root line.",
    image: images.color,
    alt: "Lived-in blonde color",
    content: [
      "A fresh balayage is the easy part. The photograph in the chair is flattering because the toner is hours old and the blowout is still warm. What matters is the hair at week twelve, in a bathroom that is not ours.",
      "We paint the lightest pieces away from the parting. Regrowth then arrives as a softer shadow instead of a stripe. If you wear a center part every day, tell us before the bowl is mixed — the map of the color changes.",
      "Gloss appointments exist for the in-between. They do not lift the hair. They put the tone back when Los Angeles water and sun have warmed it. Most guests come for a gloss halfway to their next full color.",
      "If you are booking your first color at Orielle, choose Lived-in Balayage and write what you are growing out of when you call. The starting price covers shoulder-length hair. We confirm anything beyond that before a brush touches your head.",
    ],
  },
  {
    slug: "hot-towel-notes",
    category: "Barbershop",
    date: "February 2, 2026",
    title: "Notes on the hot towel shave",
    excerpt: "Steam, oil, razor, another towel — and then you can look in the mirror.",
    image: images.beard,
    alt: "Beard grooming",
    content: [
      "A hot towel is not a gesture. It softens the hair and settles the skin so the razor has less to argue with. We use two before the shave and one after, and we will not be hurried through them.",
      "Come with a little growth if you can. A razor over a face that was shaved at dawn is mostly theater. A face with a day on it is the actual service.",
      "We use a straight razor on the grain first. Against the grain is a conversation, not a default — some skin prefers the closer pass, some does not. Say so. The chair is not a place for surprises.",
      "The shave can be booked alone or after a cut. If you want both, choose Cut & Beard or tell us when you call and we will lengthen the sitting.",
    ],
  },
  {
    slug: "sunday-hour",
    category: "Studio",
    date: "January 18, 2026",
    title: "The Sunday hour is the quiet one",
    excerpt: "Both rooms open late and close early on Sundays. It is the best time to talk through a real change.",
    image: images.finish,
    alt: "Finished haircut",
    content: [
      "Sunday runs from eleven to four. The book is shorter, the front desk is one person, and the playlists stay low. If you are deciding between cutting a length you have kept for years or finally covering grey, this is the sitting we would choose for you.",
      "Wilshire keeps the makeup studio closed on Sundays. Nails are Wilshire-only all week. Silver Lake is cuts, color, and the barber chairs.",
      "New guests receive twenty percent off a first visit when they call and mention it. The offer applies to the starting price of the service, not to product, and it is one visit per person.",
    ],
  },
];

export function getNote(slug: string) {
  return notes.find((note) => note.slug === slug);
}

export const faqs = [
  {
    question: "How do I schedule an appointment?",
    answer: [
      "Book online at any time, or call the studio you want. Choose a room, a service, and an artist — or leave the artist as “any available.”",
      "Payment is at the studio when you arrive. New guests: mention “first visit” when you call for twenty percent off the starting price.",
    ],
  },
  {
    question: "Who should I choose as my artist?",
    answer: [
      "If you already know who you like, book that chair. If you are new, choose “any available” or read the Team page — each artist lists the services they take.",
      "Color and bridal makeup stay strongest with the specialists who hold those books. Fades and shaves are with the barbers.",
    ],
  },
  {
    question: "If I need to cancel, what should I do?",
    answer: [
      "Call the studio on your confirmation as soon as you can. Same-day changes are easiest by phone — the book moves after ten.",
      "Keep your reference code (ORI-XXXX) when you call so the desk can find the sitting quickly.",
    ],
  },
  {
    question: "Do you take gift cards or certificates?",
    answer: [
      "Yes. Digital gift cards are available in set amounts on the Gift cards page. Request one online and the desk confirms by email — redemption is at either studio.",
      "We also accept gift certificates purchased at the front desk.",
    ],
  },
  {
    question: "What products do you use?",
    answer: [
      "We keep a short shelf of professional color, styling, and grooming lines chosen for Los Angeles water and weather — not a wall of retail noise.",
      "Ask your artist what is on your hair or in your kit; they will tell you what to buy only if it earns a place at home.",
    ],
  },
  {
    question: "Which services are at which studio?",
    answer: [
      "Wilshire is the full room: salon, barber, makeup, and nails. Silver Lake is cuts, color, and the gentlemen’s chairs.",
      "Makeup and nails are Wilshire only. Silver Lake opens an hour earlier on Saturdays.",
    ],
  },
];

export const giftCards = [
  {
    id: "card-100",
    amount: 100,
    label: "$100",
    blurb: "A gloss, a classic cut, or toward a longer sitting.",
  },
  {
    id: "card-250",
    amount: 250,
    label: "$250",
    blurb: "Color, an event style, or a generous first visit.",
  },
  {
    id: "card-500",
    amount: 500,
    label: "$500",
    blurb: "Balayage, bridal, or several visits across the year.",
  },
];

export const strip = [images.cut, images.beard, images.nails, images.fade, images.salon, images.shop];
