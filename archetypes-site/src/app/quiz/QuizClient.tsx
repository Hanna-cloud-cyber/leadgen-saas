"use client";

import Link from "next/link";
import { useState } from "react";
import BuyButton from "@/components/BuyButton";
import { families, quiz, store, usd, type FamilyId } from "@/data";

export default function QuizClient() {
  const [answers, setAnswers] = useState<FamilyId[]>([]);
  const step = answers.length;
  const done = step === quiz.length;

  if (done) {
    const scores = new Map<FamilyId, number>();
    for (const a of answers) scores.set(a, (scores.get(a) ?? 0) + 1);
    const ranked = [...scores.entries()].sort((a, b) => b[1] - a[1]);
    const family = families.find((f) => f.id === ranked[0][0])!;
    const second = ranked[1] ? families.find((f) => f.id === ranked[1][0]) : undefined;

    return (
      <div className="text-center">
        <p className="eyebrow">Your archetype family</p>
        <h1 className="font-display text-4xl sm:text-6xl font-bold mt-4 text-gold">{family.name}</h1>
        <p className="text-[11px] tracking-[0.3em] uppercase text-rose mt-3">{family.essence}</p>
        <p className="text-muted mt-6 max-w-xl mx-auto leading-relaxed">{family.description}</p>
        {second && (
          <p className="text-sm text-muted mt-3">
            With a strong secondary pull toward <span className="text-cream">{second.name}</span>.
          </p>
        )}

        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {family.archetypes.map((name) => (
            <span key={name} className="card px-4 py-2 font-display text-sm">{name}</span>
          ))}
        </div>

        <div className="frame-gold rounded-2xl p-6 sm:p-10 mt-12">
          <h2 className="font-display text-2xl sm:text-3xl font-bold">
            <span className="text-gold">One of these 6 is you. </span>
            <span className="text-rose">Find out which.</span>
          </h2>
          <p className="text-muted mt-4 max-w-lg mx-auto text-sm leading-relaxed">
            The Self-Discovery Test inside the guide reveals your exact archetype out of all 30.
          </p>
          <div className="max-w-sm mx-auto mt-8">
            <BuyButton label={`Get the guide · ${usd(store.priceCents)}`} className="w-full py-4 text-sm" />
          </div>
          <p className="text-xs text-muted mt-3">Instant PDF download · {store.refundDays}-day money-back guarantee</p>
        </div>

        <button onClick={() => setAnswers([])} className="text-xs text-muted underline underline-offset-4 mt-8">
          Retake the quiz
        </button>
      </div>
    );
  }

  const current = quiz[step];
  return (
    <div>
      <div className="flex items-center justify-between text-[11px] tracking-[0.25em] uppercase text-muted">
        <span>Question {step + 1} / {quiz.length}</span>
        {step > 0 && (
          <button onClick={() => setAnswers(answers.slice(0, -1))} className="hover:text-cream">
            ← Back
          </button>
        )}
      </div>
      <div className="h-1 bg-white/10 rounded-full mt-3 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[var(--gold-dark)] via-[var(--gold)] to-[var(--gold-light)] transition-all"
          style={{ width: `${(step / quiz.length) * 100}%` }}
        />
      </div>
      <h1 className="font-display text-2xl sm:text-3xl font-bold mt-10 text-center leading-snug text-gold">
        {current.q}
      </h1>
      <div className="mt-8 space-y-3">
        {current.answers.map((a) => (
          <button
            key={a.text}
            onClick={() => setAnswers([...answers, a.family])}
            className="w-full card px-5 py-4 text-left text-[15px] hover:border-[var(--gold)] hover:bg-[rgba(214,173,94,0.08)] transition-colors"
          >
            {a.text}
          </button>
        ))}
      </div>
      <p className="text-center text-xs text-muted mt-8">
        No email required. <Link href="/" className="underline underline-offset-4">Back to the guide</Link>
      </p>
    </div>
  );
}
