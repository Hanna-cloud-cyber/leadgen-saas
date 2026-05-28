"use client";

import { useState, useEffect } from "react";

const WORLD_CUP_START = new Date("2026-06-11T00:00:00Z");

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <TimeBox value={timeLeft.days} label="JOURS" />
      <span className="text-accent text-2xl font-light animate-countdown">:</span>
      <TimeBox value={timeLeft.hours} label="HEURES" />
      <span className="text-accent text-2xl font-light animate-countdown">:</span>
      <TimeBox value={timeLeft.minutes} label="MIN" />
      <span className="text-accent text-2xl font-light animate-countdown">:</span>
      <TimeBox value={timeLeft.seconds} label="SEC" />
    </div>
  );
}

function TimeBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="countdown-box px-3 sm:px-4 py-2 sm:py-3 text-center min-w-[56px]">
      <div className="text-xl sm:text-3xl font-black tabular-nums gradient-text-static">
        {String(value).padStart(2, "0")}
      </div>
      <div className="text-[9px] sm:text-[10px] font-semibold text-muted tracking-widest mt-0.5">
        {label}
      </div>
    </div>
  );
}

function getTimeLeft() {
  const now = new Date();
  const diff = Math.max(0, WORLD_CUP_START.getTime() - now.getTime());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}
