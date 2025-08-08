"use client";

import { useEffect } from "react";

type Props = {
  guesses: Set<string>;
  onGuess: (letter: string) => void;
  disabled?: boolean;
  secret: string;
};

const LETTERS = "abcdefghijklmnopqrstuvwxyz".split("");

function normalize(s: string) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export default function Keyboard({ guesses, onGuess, disabled, secret }: Props) {
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      const k = e.key.toLowerCase();
      if (k.length === 1 && k >= "a" && k <= "z") {
        e.preventDefault();
        onGuess(k);
      }
    }
    if (!disabled) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [disabled, onGuess]);

  const normSecret = normalize(secret);

  return (
    <div className="grid grid-cols-7 sm:grid-cols-10 gap-2 sm:gap-2.5 w-full max-w-3xl">
      {LETTERS.map((l) => {
        const guessed = guesses.has(l);
        const correct = normSecret.includes(normalize(l));
        return (
          <button
            key={l}
            onClick={() => onGuess(l)}
            disabled={disabled || guessed}
            className={`px-3 py-3 sm:px-2 sm:py-2 rounded-lg border text-base sm:text-sm font-semibold sm:font-medium select-none transition-colors ${
              guessed
                ? correct
                  ? "bg-green-600 text-white border-green-700"
                  : "bg-red-600 text-white border-red-700"
                : "bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10"
            }`}
            aria-label={`Letter ${l}`}
          >
            {l.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}

