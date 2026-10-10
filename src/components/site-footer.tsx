import { hours, locations } from "@/data/home";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-stone">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-6 py-16 md:grid-cols-3">
        <div>
          <h2 className="font-serif text-2xl uppercase tracking-tight text-ink">Our studios</h2>
          <div className="mt-5 space-y-5 text-sm leading-7">
            {locations.map((location) => (
              <p key={location.name}>
                <a href={`/locations#${location.slug}`} className="text-ink hover:text-bronze">
                  {location.name.replace("Visit ", "Orielle ")}
                </a>
                <br />
                {location.address}
              </p>
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-serif text-2xl uppercase tracking-tight text-ink">Get in touch</h2>
          <p className="mt-5 text-sm leading-7">
            <a href="/contact" className="text-ink hover:text-bronze">
              Contact the desk
            </a>
            <br />
            <a href="tel:3235550148" className="text-ink hover:text-bronze">
              (323) 555-0148
            </a>
            <br />
            <a href="mailto:hello@orielle.studio" className="hover:text-ink">
              hello@orielle.studio
            </a>
          </p>
        </div>
        <div>
          <h2 className="font-serif text-2xl uppercase tracking-tight text-ink">Working hours</h2>
          <ul className="mt-5 space-y-2 text-sm">
            {hours.map(([day, time]) => (
              <li key={day} className="flex justify-between gap-6 border-b border-line py-2">
                <span>{day}</span>
                <span className="text-ink">{time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-[1200px] px-6 py-6 text-[12px] uppercase tracking-[0.16em]">
          © {new Date().getFullYear()} Orielle. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
