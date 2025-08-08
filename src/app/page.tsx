"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import HangmanFigure from "@/components/HangmanFigure";
import Keyboard from "@/components/Keyboard";
import { THEMES, THEMES_PT, getRandomWord, getRandomWordPt } from "@/data/words";
import { STRINGS, type Locale } from "@/i18n/strings";
import Sprites from "@/components/Sprites";
import Effects from "@/components/Effects";
import WordDecor from "@/components/WordDecor";

function normalize(s: string) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export default function Home() {
  const [lang, setLang] = useState<Locale>("pt");
  const [theme, setTheme] = useState<keyof typeof THEMES | keyof typeof THEMES_PT | "">("");
  const [secret, setSecret] = useState<string>("");
  const [guesses, setGuesses] = useState<Set<string>>(new Set());
  const [status, setStatus] = useState<"playing" | "won" | "lost">("playing");
  const [wins, setWins] = useState<number>(0);
  const [losses, setLosses] = useState<number>(0);
  const [countdown, setCountdown] = useState<number | null>(null);
  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const maxWrong = 6;

  // Load persisted scores on first render
  useEffect(() => {
    try {
      const raw = localStorage.getItem("hangman_score");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (typeof parsed?.wins === "number") setWins(parsed.wins);
        if (typeof parsed?.losses === "number") setLosses(parsed.losses);
      }
    } catch (_) {
      // ignore parsing/storage errors
    }
  }, []);

  // Persist scores whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("hangman_score", JSON.stringify({ wins, losses }));
    } catch (_) {
      // ignore storage errors
    }
  }, [wins, losses]);

  // Pick a random theme when language changes or on first load
  useEffect(() => {
    const themes = lang === "pt" ? Object.keys(THEMES_PT) : Object.keys(THEMES);
    if (!theme && themes.length > 0) {
      const rand = themes[Math.floor(Math.random() * themes.length)] as keyof typeof THEMES | keyof typeof THEMES_PT;
      setTheme(rand);
    }
  }, [lang, theme]);

  useEffect(() => {
    if (theme) {
      const isPt = lang === "pt";
      const word = isPt && (theme as string) in THEMES_PT
        ? getRandomWordPt(theme as keyof typeof THEMES_PT)
        : getRandomWord(theme as keyof typeof THEMES);
      setSecret(word);
      setGuesses(new Set());
      setStatus("playing");
    }
  }, [theme, lang]);

  const wrongGuesses = useMemo(() => {
    const nSecret = normalize(secret);
    return Array.from(guesses).filter((c) => !nSecret.includes(normalize(c))).length;
  }, [guesses, secret]);

  const masked = useMemo(() => {
    if (!secret) return "";
    const nGuesses = new Set(Array.from(guesses).map((g) => normalize(g)));
    return secret
      .split("")
      .map((ch) => (ch === " " ? " / " : nGuesses.has(normalize(ch)) ? ch : "_"))
      .join(" ");
  }, [secret, guesses]);

  useEffect(() => {
    if (!secret || status !== "playing") return;
    const nGuesses = new Set(Array.from(guesses).map((g) => normalize(g)));
    if (secret.split("").every((ch) => ch === " " || nGuesses.has(normalize(ch)))) {
      setStatus("won");
    } else if (wrongGuesses >= maxWrong) {
      setStatus("lost");
    }
  }, [guesses, secret, status, wrongGuesses]);

  // Track wins and losses when status changes
  useEffect(() => {
    // Increment only on transition into a terminal state
    if (status === "won") {
      setWins((w) => w + 1);
    } else if (status === "lost") {
      setLosses((l) => l + 1);
    }
    // We reset status back to 'playing' on new word, so repeated increments won't happen
    // because this effect will only run when status becomes 'won' or 'lost'.
  }, [status]);

  // Auto start a new game after 5 seconds on win/loss with random theme
  useEffect(() => {
    // cleanup helper
    const clearTimers = () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    if (status === "won" || status === "lost") {
      setCountdown(5);
      intervalRef.current = window.setInterval(() => {
        setCountdown((c) => (c !== null ? Math.max(0, c - 1) : null));
      }, 1000);
      timeoutRef.current = window.setTimeout(() => {
        const themes = lang === "pt" ? Object.keys(THEMES_PT) : Object.keys(THEMES);
        if (themes.length > 0) {
          const rand = themes[Math.floor(Math.random() * themes.length)] as keyof typeof THEMES | keyof typeof THEMES_PT;
          setTheme(rand);
        }
        setCountdown(null);
        clearTimers();
      }, 5000);
    } else {
      // if back to playing or initial, clear any pending timers
      setCountdown(null);
      clearTimers();
    }

    return () => {
      clearTimers();
    };
  }, [status, lang]);

  function onGuess(letter: string) {
    if (status !== "playing" || !letter || guesses.has(letter)) return;
    setGuesses((prev) => new Set(prev).add(letter));
  }

  function reset() {
    if (!theme) return;
    const isPt = lang === "pt";
    const word = isPt && (theme as string) in THEMES_PT
      ? getRandomWordPt(theme as keyof typeof THEMES_PT)
      : getRandomWord(theme as keyof typeof THEMES);
    setSecret(word);
    setGuesses(new Set());
    setStatus("playing");
  }

  return (
    <div className="relative min-h-screen px-4 py-4 sm:p-6 flex flex-col items-center gap-4 sm:gap-6 overflow-hidden">
      <Sprites />
      <header className="relative z-10 w-full max-w-3xl flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 sm:gap-3">
        <h1 className="text-xl sm:text-2xl font-bold">{STRINGS[lang].title}</h1>
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <select
            className="px-3 py-2 rounded border bg-transparent text-sm sm:text-base"
            value={lang}
            onChange={(e) => setLang(e.target.value as Locale)}
            aria-label={STRINGS[lang].language}
          >
            <option value="en">EN</option>
            <option value="pt">PT-BR</option>
          </select>

          <select
            className="px-3 py-2 rounded border bg-transparent text-sm sm:text-base"
            value={theme}
            onChange={(e) => setTheme(e.target.value as keyof typeof THEMES | keyof typeof THEMES_PT | "")}
          >
            <option value="">{STRINGS[lang].selectTheme}</option>
            {(lang === "pt" ? Object.keys(THEMES_PT) : Object.keys(THEMES)).map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <button
            className="px-4 py-2 rounded bg-foreground text-background disabled:opacity-50 text-sm sm:text-base"
            onClick={reset}
            disabled={!theme}
          >
            {STRINGS[lang].newWord}
          </button>
        </div>
      </header>

      <main className="relative z-10 w-full max-w-3xl flex flex-col items-center gap-4 sm:gap-6 pb-[calc(env(safe-area-inset-bottom)+72px)]">
        {!theme && (
          <p className="opacity-80 text-sm sm:text-base">{STRINGS[lang].chooseThemeToStart}</p>
        )}

        {theme && (
          <>
            <div className="w-full flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start justify-center">
              <HangmanFigure wrong={wrongGuesses} maxWrong={maxWrong} />
              <div className="flex-1 flex flex-col items-center gap-3 sm:gap-4">
                <div className="relative text-2xl sm:text-3xl tracking-widest font-mono select-none text-center">
                  <WordDecor />
                  {masked || ""}
                </div>
                <div className="text-xs sm:text-sm opacity-70">{STRINGS[lang].themeLabel}: {theme}</div>
                <div className="text-xs sm:text-sm opacity-70">
                  {STRINGS[lang].wrongLabel}: {wrongGuesses}/{maxWrong}
                </div>
                <div className="flex gap-3 text-xs sm:text-sm opacity-80">
                  <span>{STRINGS[lang].winsLabel}: {wins}</span>
                  <span>{STRINGS[lang].lossesLabel}: {losses}</span>
                </div>
                {status !== "playing" && (
                  <div
                    className={`px-3 py-2 rounded font-semibold text-center ${
                      status === "won"
                        ? "bg-green-600 text-white"
                        : "bg-red-600 text-white"
                    }`}
                    aria-live="polite"
                  >
                    {status === "won" ? STRINGS[lang].youWon : `${STRINGS[lang].youLost} ${secret}`}
                    {countdown !== null && (
                      <div className="mt-1 text-xs opacity-95">
                        {STRINGS[lang].autoNewGameIn}: {countdown}s
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="sticky bottom-0 left-0 right-0 w-full bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t">
              <div className="mx-auto max-w-3xl px-3 pt-2 pb-[calc(env(safe-area-inset-bottom)+10px)]">
                <Keyboard
                  disabled={!theme || status !== "playing"}
                  guesses={guesses}
                  onGuess={onGuess}
                  secret={secret}
                />
              </div>
            </div>
          </>
        )}
      </main>

      <Effects state={status} />

      <footer className="relative z-10 mt-auto opacity-60 text-xs sm:text-sm">
        {STRINGS[lang].tip}
      </footer>
    </div>
  );
}
