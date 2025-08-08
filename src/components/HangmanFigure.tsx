"use client";

import React from "react";

export default function HangmanFigure({
  wrong,
  maxWrong = 6,
}: {
  wrong: number;
  maxWrong?: number;
}) {
  // Simple SVG gallows + parts progressively shown
  const parts = [
    // head
    <circle key="head" cx="140" cy="60" r="15" className="stroke-current" strokeWidth={4} fill="none" />,
    // body
    <line key="body" x1="140" y1="75" x2="140" y2="115" className="stroke-current" strokeWidth={4} />,
    // left arm
    <line key="larm" x1="140" y1="90" x2="120" y2="105" className="stroke-current" strokeWidth={4} />,
    // right arm
    <line key="rarm" x1="140" y1="90" x2="160" y2="105" className="stroke-current" strokeWidth={4} />,
    // left leg
    <line key="lleg" x1="140" y1="115" x2="125" y2="140" className="stroke-current" strokeWidth={4} />,
    // right leg
    <line key="rleg" x1="140" y1="115" x2="155" y2="140" className="stroke-current" strokeWidth={4} />,
  ];

  const shownCount = Math.min(wrong, maxWrong);

  return (
    <svg
      viewBox="0 0 200 180"
      className="w-full max-w-[260px] sm:max-w-[320px] h-auto text-foreground"
      role="img"
      aria-label={`Hangman figure with ${wrong} wrong of ${maxWrong}`}
    >
      {/* warm base and pole with soft colors */}
      <defs>
        <linearGradient id="pole" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#d1a976" />
          <stop offset="100%" stopColor="#b88746" />
        </linearGradient>
        <linearGradient id="accent" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#fb923c" />
        </linearGradient>
      </defs>
      {/* base */}
      <line x1="10" y1="170" x2="190" y2="170" stroke="url(#pole)" strokeWidth={6} />
      {/* pole */}
      <line x1="40" y1="170" x2="40" y2="20" stroke="url(#pole)" strokeWidth={6} />
      <line x1="40" y1="20" x2="140" y2="20" stroke="url(#pole)" strokeWidth={6} />
      <line x1="140" y1="20" x2="140" y2="40" stroke="url(#pole)" strokeWidth={6} />
      {/* rope */}
      <line x1="140" y1="40" x2="140" y2="45" stroke="#eab308" strokeWidth={4} />

      {/* decorative sprites around the hangman */}
      <g className="opacity-70">
        {/* small sun */}
        <circle cx="100" cy="8" r="6" fill="#fde68a" className="animate-float" />
        {/* little leaf */}
        <path d="M25 155 C35 145, 45 145, 55 155 C45 152, 35 152, 25 155 Z" fill="#86efac" className="animate-float" />
        {/* spark */}
        <polygon points="165,30 170,42 182,47 170,52 165,64 160,52 148,47 160,42" fill="#fb923c" className="animate-pop" />
      </g>

      {/* person parts with pop animation */}
      <g className="origin-top animate-swing-slow">
        {parts.map((el, i) => (
          <g
            key={i}
            className={`transition-all duration-500 ease-out ${i < shownCount ? "opacity-100 animate-pop" : "opacity-0"}`}
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            {el}
          </g>
        ))}
      </g>
    </svg>
  );
}

