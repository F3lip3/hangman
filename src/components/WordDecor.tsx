"use client";

export default function WordDecor() {
  return (
    <div aria-hidden className="relative w-full flex items-center justify-center">
      {/* top left star */}
      <svg className="absolute -top-3 -left-2 w-5 h-5 opacity-70 animate-float" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l2.9 5.9L21 9.3l-4.5 4.3L17.8 21 12 17.8 6.2 21l1.3-7.4L3 9.3l6.1-1.4L12 2z" fill="#f59e0b" />
      </svg>
      {/* top right heart */}
      <svg className="absolute -top-2 -right-3 w-5 h-5 opacity-70 animate-float delay-200" viewBox="0 0 24 24" fill="none">
        <path d="M12 21s-6.7-4.3-9.5-7.1C-0.2 11.6 1 7.4 4.2 6.5 6.2 6 7.9 7 9 8.3 10.1 7 11.8 6 13.8 6.5 17 7.4 18.2 11.6 14.5 13.9 12.7 15.1 12 21 12 21z" fill="#ef4444" />
      </svg>
      {/* bottom center music note */}
      <svg className="absolute -bottom-3 w-5 h-5 opacity-70 animate-float delay-300" viewBox="0 0 24 24" fill="none">
        <path d="M9 19a3 3 0 100-6 3 3 0 000 6zm8-14v9.17A3 3 0 1115 17V7h2z" fill="#22c55e" />
      </svg>
    </div>
  );
}

