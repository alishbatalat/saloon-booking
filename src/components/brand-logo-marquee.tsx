const scriptFont = "'Meow Script', cursive";

function arcPoint(cx: number, cy: number, r: number, phiDeg: number) {
  const phi = (phiDeg * Math.PI) / 180;
  return { x: cx + r * Math.sin(phi), y: cy - r * Math.cos(phi) };
}

/** Arc bulging through the top of the circle, traced left → right. */
function topArcPath(cx: number, cy: number, r: number, spanDeg: number) {
  const a = arcPoint(cx, cy, r, -spanDeg / 2);
  const b = arcPoint(cx, cy, r, spanDeg / 2);
  return `M ${a.x} ${a.y} A ${r} ${r} 0 0 1 ${b.x} ${b.y}`;
}

/** Arc bulging through the bottom of the circle, traced left → right (pair with side="right" on the textPath so glyphs stay upright). */
function bottomArcPath(cx: number, cy: number, r: number, spanDeg: number) {
  const a = arcPoint(cx, cy, r, 180 + spanDeg / 2);
  const b = arcPoint(cx, cy, r, 180 - spanDeg / 2);
  return `M ${a.x} ${a.y} A ${r} ${r} 0 0 0 ${b.x} ${b.y}`;
}

/** Circular emblem: curved label on top, a big initial in the middle, a curved "established" line on the bottom, cut by a diagonal stroke. */
function CircleBadgeLogo({ idPrefix, letter, topText, bottomText }: { idPrefix: string; letter: string; topText: string; bottomText: string }) {
  const topId = `${idPrefix}-top`;
  const bottomId = `${idPrefix}-bottom`;
  return (
    <svg viewBox="0 0 220 220" className="h-20 w-20 shrink-0 text-ink/35 transition duration-300 group-hover:text-ink" aria-hidden>
      <line x1="14" y1="196" x2="76" y2="134" stroke="currentColor" strokeWidth="1" />
      <line x1="144" y1="86" x2="206" y2="24" stroke="currentColor" strokeWidth="1" />
      <circle cx="110" cy="110" r="95" fill="var(--color-stone)" stroke="currentColor" strokeWidth="1" />
      <path id={topId} d={topArcPath(110, 110, 76, 150)} fill="none" />
      <path id={bottomId} d={bottomArcPath(110, 110, 76, 150)} fill="none" />
      <text fontSize="10.5" letterSpacing="2" fill="currentColor">
        <textPath href={`#${topId}`} startOffset="50%" textAnchor="middle">
          {topText}
        </textPath>
      </text>
      <text fontSize="10.5" letterSpacing="2" fill="currentColor">
        <textPath href={`#${bottomId}`} startOffset="50%" textAnchor="middle" {...({ side: "right" } as Record<string, string>)}>
          {bottomText}
        </textPath>
      </text>
      <text x="110" y="132" textAnchor="middle" fontSize="62" fontFamily="var(--font-serif)" fontStyle="italic" fill="currentColor">
        {letter}
      </text>
    </svg>
  );
}

/** Small caps + a script wordmark + a tracked tagline + an "ESTD" line. */
function ScriptWordmarkLogo({ initials, script, tagline, estd }: { initials: string; script: string; tagline: string; estd: string }) {
  return (
    <div className="flex shrink-0 flex-col items-center text-ink/35 transition duration-300 group-hover:text-ink">
      <span className="font-serif text-[11px] font-semibold tracking-[0.3em]">{initials}</span>
      <span className="-mt-1 text-[34px] leading-none" style={{ fontFamily: scriptFont }}>
        {script}
      </span>
      <span className="mt-1.5 text-[9px] font-medium uppercase tracking-[0.26em]">{tagline}</span>
      <span className="mt-1.5 flex items-center gap-2 text-[9px] uppercase tracking-[0.2em]">
        <span>Estd</span>
        <span className="opacity-50">|</span>
        <span>{estd}</span>
      </span>
    </div>
  );
}

/** Shallow curved "established" line, a bold word, a tracked word, and a script sign-off with a swash rule. */
function LayeredArcLogo({ idPrefix, estd, boldWord, trackedWord, scriptWord }: { idPrefix: string; estd: string; boldWord: string; trackedWord: string; scriptWord: string }) {
  const arcId = `${idPrefix}-arc`;
  return (
    <div className="flex shrink-0 flex-col items-center text-ink/35 transition duration-300 group-hover:text-ink">
      <svg viewBox="0 0 160 34" className="h-7 w-36" aria-hidden>
        <path id={arcId} d={topArcPath(80, 108, 100, 34)} fill="none" />
        <text fontSize="8.5" letterSpacing="2.5" fill="currentColor">
          <textPath href={`#${arcId}`} startOffset="50%" textAnchor="middle">
            {estd}
          </textPath>
        </text>
      </svg>
      <span className="-mt-0.5 font-serif text-2xl font-bold uppercase tracking-[0.04em]">{boldWord}</span>
      <span className="mt-0.5 text-[10px] uppercase tracking-[0.34em]">{trackedWord}</span>
      <span className="mt-1 text-lg" style={{ fontFamily: scriptFont }}>
        {scriptWord}
      </span>
      <span className="mt-1 h-px w-14 bg-current opacity-40" />
    </div>
  );
}

type LogoDef =
  | { type: "circle"; letter: string; topText: string; bottomText: string }
  | { type: "script"; initials: string; script: string; tagline: string; estd: string }
  | { type: "layered"; estd: string; boldWord: string; trackedWord: string; scriptWord: string };

const logos: LogoDef[] = [
  { type: "circle", letter: "N", topText: "Nail Atelier", bottomText: "Estd 2018" },
  { type: "script", initials: "MU", script: "MakeUp", tagline: "Beauty and Wellness", estd: "2016" },
  { type: "layered", estd: "Estd 2010", boldWord: "Natural", trackedWord: "Cosmetics", scriptWord: "studio" },
  { type: "circle", letter: "B", topText: "Beauty Bar Co.", bottomText: "Estd 2015" },
  { type: "script", initials: "GN", script: "GlossNails", tagline: "Nail Care & Spa", estd: "2019" },
];

function Logo({ def, idPrefix }: { def: LogoDef; idPrefix: string }) {
  if (def.type === "circle") {
    return <CircleBadgeLogo idPrefix={idPrefix} letter={def.letter} topText={def.topText} bottomText={def.bottomText} />;
  }
  if (def.type === "script") {
    return <ScriptWordmarkLogo initials={def.initials} script={def.script} tagline={def.tagline} estd={def.estd} />;
  }
  return <LayeredArcLogo idPrefix={idPrefix} estd={def.estd} boldWord={def.boldWord} trackedWord={def.trackedWord} scriptWord={def.scriptWord} />;
}

export function BrandLogoMarquee() {
  return (
    <div className="overflow-hidden border-y border-line bg-white py-12">
      <div className="flex w-max animate-logo-marquee items-center hover:[animation-play-state:paused]">
        {[...logos, ...logos].map((def, index) => (
          <div key={index} className="group flex shrink-0 items-center px-9">
            <Logo def={def} idPrefix={`brand-logo-${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
