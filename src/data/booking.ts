export type BookingService = {
  id: string;
  name: string;
  category: "salon" | "barbershop";
  summary: string;
  price: number;
  priceMax?: number;
  duration: number;
  locations: string[];
};

export type BookingStylist = {
  id: string;
  name: string;
  role: string;
  locationId: string;
  serviceIds: string[];
  experience: string;
  bio: string[];
  image: string;
  alt: string;
};

export type BookingLocation = {
  id: string;
  name: string;
  neighborhood: string;
  blurb: string;
  phone: string;
  hours: { day: number; label: string; open: string; close: string }[];
};

const weekday = { open: "10:00", close: "19:00" };
const saturday = { open: "10:00", close: "17:00" };
const saturdayEarly = { open: "09:00", close: "17:00" };
const sunday = { open: "11:00", close: "16:00" };

function week(sat: { open: string; close: string }) {
  return [
    { day: 0, label: "Sunday", ...sunday },
    { day: 1, label: "Monday", ...weekday },
    { day: 2, label: "Tuesday", ...weekday },
    { day: 3, label: "Wednesday", ...weekday },
    { day: 4, label: "Thursday", ...weekday },
    { day: 5, label: "Friday", ...weekday },
    { day: 6, label: "Saturday", ...sat },
  ];
}

export const bookingLocations: BookingLocation[] = [
  {
    id: "wilshire",
    name: "Wilshire",
    neighborhood: "Beverly Grove",
    blurb: "Salon chairs, barber chairs, makeup, and nails.",
    phone: "(323) 555-0148",
    hours: week(saturday),
  },
  {
    id: "silver-lake",
    name: "Silver Lake",
    neighborhood: "Silver Lake",
    blurb: "Cuts, color, and the barber chairs. Opens earlier on Saturdays.",
    phone: "(323) 555-0194",
    hours: week(saturdayEarly),
  },
];

export const bookingServices: BookingService[] = [
  {
    id: "signature-cut",
    name: "Signature Cut & Finish",
    category: "salon",
    summary: "A tailored cut with a soft blowout.",
    price: 95,
    duration: 75,
    locations: ["wilshire", "silver-lake"],
  },
  {
    id: "blowout",
    name: "Blowout & Style",
    category: "salon",
    summary: "Smooth, brushed movement for evenings and photographs.",
    price: 68,
    duration: 45,
    locations: ["wilshire", "silver-lake"],
  },
  {
    id: "event-updo",
    name: "Event Updo",
    category: "salon",
    summary: "A pinned style built to last through a long evening.",
    price: 145,
    duration: 75,
    locations: ["wilshire"],
  },
  {
    id: "balayage",
    name: "Lived-in Balayage",
    category: "salon",
    summary: "Soft dimension painted where the light hits.",
    price: 220,
    priceMax: 340,
    duration: 180,
    locations: ["wilshire", "silver-lake"],
  },
  {
    id: "root-refresh",
    name: "Root Refresh",
    category: "salon",
    summary: "Regrowth blended into your existing color.",
    price: 110,
    duration: 90,
    locations: ["wilshire", "silver-lake"],
  },
  {
    id: "gloss",
    name: "Gloss & Tone",
    category: "salon",
    summary: "Shine and tone without a full color sitting.",
    price: 85,
    duration: 45,
    locations: ["wilshire", "silver-lake"],
  },
  {
    id: "keratin",
    name: "Smoothing Ritual",
    category: "salon",
    summary: "Humidity-resistant smooth-down for your cut’s shape.",
    price: 260,
    duration: 150,
    locations: ["wilshire"],
  },
  {
    id: "scalp",
    name: "Scalp Ritual",
    category: "salon",
    summary: "A slow cleanse, massage, and serum.",
    price: 70,
    duration: 45,
    locations: ["wilshire", "silver-lake"],
  },
  {
    id: "soft-glam",
    name: "Soft Glam Makeup",
    category: "salon",
    summary: "Full-face makeup for photographs and evenings.",
    price: 110,
    duration: 60,
    locations: ["wilshire"],
  },
  {
    id: "bridal-makeup",
    name: "Bridal Makeup",
    category: "salon",
    summary: "Wedding-day application, set for a long day.",
    price: 175,
    duration: 75,
    locations: ["wilshire"],
  },
  {
    id: "gel-manicure",
    name: "Gel Manicure",
    category: "salon",
    summary: "Shaping, cuticle care, and gel color.",
    price: 52,
    duration: 50,
    locations: ["wilshire"],
  },
  {
    id: "spa-pedicure",
    name: "Spa Pedicure",
    category: "salon",
    summary: "Soak, polish, and an unhurried foot massage.",
    price: 72,
    duration: 60,
    locations: ["wilshire"],
  },
  {
    id: "classic-cut",
    name: "Classic Cut",
    category: "barbershop",
    summary: "Scissor and clipper work with a tapered finish.",
    price: 48,
    duration: 40,
    locations: ["wilshire", "silver-lake"],
  },
  {
    id: "skin-fade",
    name: "Skin Fade",
    category: "barbershop",
    summary: "A close fade blended into the length on top.",
    price: 58,
    duration: 45,
    locations: ["wilshire", "silver-lake"],
  },
  {
    id: "scissor-cut",
    name: "Scissor Cut",
    category: "barbershop",
    summary: "Longer texture cut entirely with shears.",
    price: 55,
    duration: 45,
    locations: ["wilshire", "silver-lake"],
  },
  {
    id: "hot-towel",
    name: "Hot Towel Shave",
    category: "barbershop",
    summary: "Steam, oil, and a straight-razor shave.",
    price: 50,
    duration: 40,
    locations: ["wilshire", "silver-lake"],
  },
  {
    id: "beard-sculpt",
    name: "Beard Sculpt",
    category: "barbershop",
    summary: "Cheek lines, neckline, and shape restored.",
    price: 35,
    duration: 30,
    locations: ["wilshire", "silver-lake"],
  },
  {
    id: "cut-and-beard",
    name: "Cut & Beard",
    category: "barbershop",
    summary: "Haircut and beard sculpt in one sitting.",
    price: 78,
    duration: 70,
    locations: ["wilshire", "silver-lake"],
  },
  {
    id: "grey-blending",
    name: "Grey Blending",
    category: "barbershop",
    summary: "A subtle blend through temples and beard.",
    price: 70,
    duration: 45,
    locations: ["wilshire", "silver-lake"],
  },
  {
    id: "father-son",
    name: "Father & Son",
    category: "barbershop",
    summary: "Two cuts, back to back, with the same barber.",
    price: 88,
    duration: 75,
    locations: ["wilshire", "silver-lake"],
  },
];

export const bookingStylists: BookingStylist[] = [
  {
    id: "amara-cole",
    name: "Amara Cole",
    role: "Creative Director",
    locationId: "wilshire",
    serviceIds: ["signature-cut", "blowout", "event-updo", "scalp"],
    experience: "Cutting & directing since 2009",
    bio: [
      "Amara opened Orielle so colorists and barbers could share one standard. She still takes a short book of cuts and event styles at Wilshire.",
      "Book her for a signature cut when you want the shape decided carefully, not rushed into a trend.",
    ],
    image: "/images/portrait.jpg",
    alt: "Amara Cole",
  },
  {
    id: "lena-voss",
    name: "Lena Voss",
    role: "Color Director",
    locationId: "wilshire",
    serviceIds: ["balayage", "root-refresh", "gloss", "keratin", "signature-cut"],
    experience: "Color since 2012",
    bio: [
      "Lena maps color for week twelve, not only for the photograph in the chair. Lived-in balayage and gloss work are her usual days.",
      "Tell her what you are growing out of — the formula changes before the bowl is mixed.",
    ],
    image: "/images/color.jpg",
    alt: "Lena Voss at work with color",
  },
  {
    id: "sofia-lang",
    name: "Sofia Lang",
    role: "Makeup & Nails",
    locationId: "wilshire",
    serviceIds: ["soft-glam", "bridal-makeup", "gel-manicure", "spa-pedicure"],
    experience: "Makeup & nails since 2014",
    bio: [
      "Sofia runs the makeup studio behind the linen curtain and the nail table at Wilshire. Soft glam and bridal faces are her strongest work.",
      "Nails stay at this room only — book gel or a spa pedicure with her when you want both hands and a quiet hour.",
    ],
    image: "/images/makeup.jpg",
    alt: "Sofia Lang applying makeup",
  },
  {
    id: "julien-march",
    name: "Julien March",
    role: "Master Barber",
    locationId: "wilshire",
    serviceIds: [
      "classic-cut",
      "skin-fade",
      "scissor-cut",
      "hot-towel",
      "beard-sculpt",
      "cut-and-beard",
      "grey-blending",
      "father-son",
    ],
    experience: "Barbering since 2008",
    bio: [
      "Julien keeps the Wilshire barber chairs. Fades, scissor cuts, and hot-towel shaves — he remembers a neckline without being asked twice.",
      "Father & Son sits are often his. Ask for him when you want the same barber every visit.",
    ],
    image: "/images/barber.jpg",
    alt: "Julien March at the barber chair",
  },
  {
    id: "noah-ellis",
    name: "Noah Ellis",
    role: "Senior Stylist",
    locationId: "silver-lake",
    serviceIds: ["signature-cut", "blowout", "balayage", "root-refresh", "gloss", "scalp"],
    experience: "Cutting & color since 2015",
    bio: [
      "Noah leads the Silver Lake salon book — cuts that still look like you, and color that survives the week.",
      "Saturday mornings fill first. Book ahead if you want him for balayage or a first visit cut.",
    ],
    image: "/images/finish.jpg",
    alt: "Noah Ellis finished cut",
  },
  {
    id: "mateo-ruiz",
    name: "Mateo Ruiz",
    role: "Barber",
    locationId: "silver-lake",
    serviceIds: ["classic-cut", "skin-fade", "scissor-cut", "beard-sculpt", "cut-and-beard", "father-son"],
    experience: "Barbering since 2016",
    bio: [
      "Mateo’s fades stay sharp past Friday. The Sunset shop is calmer than the street suggests, and that is how he likes the chair.",
      "Book Cut & Beard when you want the haircut and the line work in one sitting.",
    ],
    image: "/images/fade.jpg",
    alt: "Mateo Ruiz skin fade",
  },
  {
    id: "iris-chen",
    name: "Iris Chen",
    role: "Stylist & Grooming",
    locationId: "silver-lake",
    serviceIds: [
      "signature-cut",
      "blowout",
      "gloss",
      "classic-cut",
      "beard-sculpt",
      "grey-blending",
      "hot-towel",
    ],
    experience: "Salon & grooming since 2017",
    bio: [
      "Iris works both sides of the Silver Lake book — salon cuts, gloss, and quieter grooming appointments.",
      "Grey blending and hot-towel work are good reasons to choose her if you want a soft hand and a clear consult.",
    ],
    image: "/images/beard.jpg",
    alt: "Iris Chen grooming work",
  },
];

export function getBookingService(id: string) {
  return bookingServices.find((service) => service.id === id);
}

export function getBookingStylist(id: string) {
  return bookingStylists.find((stylist) => stylist.id === id);
}

export function getBookingLocation(id: string) {
  return bookingLocations.find((location) => location.id === id);
}

export function stylistsFor(locationId: string, serviceId?: string) {
  return bookingStylists.filter((stylist) => {
    if (stylist.locationId !== locationId) return false;
    if (!serviceId) return true;
    return stylist.serviceIds.includes(serviceId);
  });
}

export function servicesFor(locationId: string, category?: "salon" | "barbershop") {
  return bookingServices.filter((service) => {
    if (!service.locations.includes(locationId)) return false;
    if (!category) return true;
    return service.category === category;
  });
}
