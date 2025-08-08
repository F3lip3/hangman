"use client";

export default function Effects({ state }: { state: "won" | "lost" | "playing" }) {
  if (state === "won") return <Fireworks />;
  if (state === "lost") return <Bombs />;
  return null;
}

function Fireworks() {
  const items = Array.from({ length: 8 });
  const colors = ["#60a5fa", "#34d399", "#f472b6", "#f59e0b", "#a78bfa"];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {items.map((_, i) => {
        const left = `${(i * 12 + 10) % 90}%`;
        const top = `${20 + (i % 5) * 12}%`;
        const delay = `${(i * 120) % 800}ms`;
        const color = colors[i % colors.length];
        return (
          <div key={i} className="absolute animate-firework" style={{ left, top, animationDelay: delay }}>
            <svg width="40" height="40" viewBox="0 0 100 100">
              <g stroke={color} strokeWidth={3}>
                <line x1="50" y1="15" x2="50" y2="0" />
                <line x1="85" y1="50" x2="100" y2="50" />
                <line x1="50" y1="85" x2="50" y2="100" />
                <line x1="15" y1="50" x2="0" y2="50" />
                <line x1="78" y1="22" x2="90" y2="10" />
                <line x1="22" y1="22" x2="10" y2="10" />
                <line x1="22" y1="78" x2="10" y2="90" />
                <line x1="78" y1="78" x2="90" y2="90" />
              </g>
              <circle cx="50" cy="50" r="6" fill={color} />
            </svg>
          </div>
        );
      })}
    </div>
  );
}

function Bombs() {
  const items = Array.from({ length: 10 });
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {items.map((_, i) => {
        const left = `${(i * 10 + (i % 3) * 3) % 90}%`;
        const delay = `${i * 150}ms`;
        return (
          <div key={i} className="absolute animate-bomb" style={{ left, animationDelay: delay }}>
            <svg width="28" height="28" viewBox="0 0 100 100">
              <circle cx="50" cy="60" r="30" fill="#111827" />
              <rect x="42" y="20" width="16" height="16" rx="3" fill="#6b7280" />
              <path d="M50 20 C70 5, 90 5, 95 15" stroke="#f59e0b" strokeWidth="4" fill="none" />
            </svg>
          </div>
        );
      })}
    </div>
  );
}

