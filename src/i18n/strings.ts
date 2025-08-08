export type Locale = "en" | "pt";

export const STRINGS: Record<Locale, Record<string, string>> = {
  en: {
    title: "Hangman",
    selectTheme: "Select a theme…",
    newWord: "New word",
    chooseThemeToStart: "Choose a theme to start playing.",
    themeLabel: "Theme",
    wrongLabel: "Wrong",
    youWon: "You won!",
    youLost: "You lost. Word:",
    tip: "Tip: Use your physical keyboard too.",
    language: "Language",
  },
  pt: {
    title: "Forca",
    selectTheme: "Selecione um tema…",
    newWord: "Nova palavra",
    chooseThemeToStart: "Escolha um tema para começar a jogar.",
    themeLabel: "Tema",
    wrongLabel: "Erros",
    youWon: "Você venceu!",
    youLost: "Você perdeu. Palavra:",
    tip: "Dica: Você também pode usar o teclado físico.",
    language: "Idioma",
  },
};

