import { hours, locations } from "@/data/home";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
      <circle cx="12" cy="12" r="10.1" />
      <path
        d="M13.4 17.2v-5.1h1.7l.26-2h-1.96V8.73c0-.58.16-.97 1-.97h1.06V5.95a14 14 0 0 0-1.55-.08c-1.53 0-2.58.93-2.58 2.65v1.56H9.9v2h1.73v5.12h1.77Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
      <rect x="3.75" y="3.75" width="16.5" height="16.5" rx="4.5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="16.6" cy="7.4" r="0.65" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M14.2 21v-7.6h2.55l.38-2.96h-2.93V8.52c0-.86.24-1.44 1.47-1.44h1.57V4.42A21 21 0 0 0 15 4.3c-2.26 0-3.8 1.38-3.8 3.9v2.24H8.6v2.96h2.6V21h3Z" />
    </svg>
  );
}

function TwitterGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M21 6c-.68.32-1.42.53-2.19.63a3.8 3.8 0 0 0 1.67-2.1 7.6 7.6 0 0 1-2.41.93 3.79 3.79 0 0 0-6.46 3.46A10.76 10.76 0 0 1 3.78 4.9a3.79 3.79 0 0 0 1.17 5.06 3.76 3.76 0 0 1-1.72-.47v.05a3.79 3.79 0 0 0 3.04 3.72c-.5.14-1.03.16-1.56.06a3.8 3.8 0 0 0 3.54 2.63A7.6 7.6 0 0 1 3 17.4a10.73 10.73 0 0 0 5.82 1.71c6.98 0 10.8-5.78 10.8-10.8l-.01-.49A7.7 7.7 0 0 0 21 6Z" />
    </svg>
  );
}

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <rect x="3.75" y="3.75" width="16.5" height="16.5" rx="4.5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="16.6" cy="7.4" r="0.65" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YoutubeGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M9.8 8.6v6.8l6.1-3.4-6.1-3.4Z" />
    </svg>
  );
}

function SocialBadge({
  href,
  label,
  background,
  children,
}: {
  href: string;
  label: string;
  background: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      style={{ background }}
      className="flex h-9 w-9 items-center justify-center rounded-md text-white opacity-90 transition hover:opacity-100"
    >
      {children}
    </a>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto max-w-[900px] px-6 py-20 text-center">
        <div className="grid gap-14 sm:grid-cols-2">
          <div>
            <h2 className="font-serif text-3xl text-ink">Our Location</h2>
            <div className="mt-6 space-y-5 text-sm leading-7 text-muted">
              {locations.map((location) => (
                <p key={location.name}>
                  <a href={`/locations#${location.slug}`} className="footer-link">
                    {location.name.replace("Visit ", "Orielle ")}
                  </a>
                  <br />
                  {location.address}
                </p>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-serif text-3xl text-ink">Get in Touch</h2>
            <div className="mt-6 space-y-3 text-sm leading-7 text-muted">
              <p>
                phone:{" "}
                <a href="tel:3235550148" className="footer-link">
                  (323) 555-0148
                </a>
              </p>
              <p>
                <a href="mailto:hello@orielle.studio" className="footer-link">
                  hello@orielle.studio
                </a>
              </p>
            </div>
            <div className="mt-6 flex justify-center gap-4 text-ink/55">
              <a href="https://facebook.com" aria-label="Orielle on Facebook" className="transition hover:text-bronze">
                <FacebookIcon className="h-6 w-6" />
              </a>
              <a href="https://instagram.com" aria-label="Orielle on Instagram" className="transition hover:text-bronze">
                <InstagramIcon className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="font-serif text-3xl text-ink">Working Hours</h2>
          <ul className="mt-6 space-y-3 text-sm leading-7 text-muted">
            {hours.map(([day, time]) => (
              <li key={day}>
                {day}: <span className="text-ink">{time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center px-6 py-8 text-center">
          <p className="text-[12px] uppercase tracking-[0.16em] text-muted">
            Copyright {new Date().getFullYear()} Orielle. All rights reserved
          </p>
          <div className="mt-4 flex justify-center gap-3">
            <SocialBadge href="https://facebook.com" label="Orielle on Facebook" background="#1877F2">
              <FacebookGlyph className="h-4 w-4" />
            </SocialBadge>
            <SocialBadge href="https://twitter.com" label="Orielle on Twitter" background="#1DA1F2">
              <TwitterGlyph className="h-4 w-4" />
            </SocialBadge>
            <SocialBadge
              href="https://instagram.com"
              label="Orielle on Instagram"
              background="radial-gradient(circle at 30% 110%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)"
            >
              <InstagramGlyph className="h-4 w-4" />
            </SocialBadge>
            <SocialBadge href="https://youtube.com" label="Orielle on YouTube" background="#FF0000">
              <YoutubeGlyph className="h-4 w-4" />
            </SocialBadge>
          </div>
        </div>
      </div>
    </footer>
  );
}
