"use client";

export default function Sprites() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-0 select-none overflow-hidden">
      <svg className="absolute -top-10 -left-10 w-[220px] h-[220px] opacity-20 blur-[1px]" viewBox="0 0 100 100">
        <defs>
<linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#fcd34d"/>
            <stop offset="100%" stopColor="#fb923c"/>
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="45" fill="url(#g1)" />
      </svg>
      <svg className="absolute top-1/3 -right-10 w-[260px] h-[260px] opacity-15 rotate-12" viewBox="0 0 100 100">
        <defs>
<linearGradient id="g2" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#fbbf24"/>
            <stop offset="100%" stopColor="#f59e0b"/>
          </linearGradient>
        </defs>
        <rect x="10" y="10" width="80" height="80" rx="16" fill="url(#g2)" />
      </svg>
      <svg className="absolute bottom-[-40px] left-1/4 w-[300px] h-[300px] opacity-10 -rotate-6" viewBox="0 0 100 100">
        <defs>
<linearGradient id="g3" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#fca5a5"/>
            <stop offset="100%" stopColor="#fdba74"/>
          </linearGradient>
        </defs>
        <polygon points="50,5 95,97 5,97" fill="url(#g3)" />
      </svg>
    </div>
  );
}

