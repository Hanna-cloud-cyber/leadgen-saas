import type { Metadata } from "next";
import QuizClient from "./QuizClient";

export const metadata: Metadata = {
  title: "Free Archetype Quiz",
  description: "Answer 8 quick questions and discover which feminine archetype family leads you.",
};

export default function QuizPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-20 min-h-[70vh]">
      <QuizClient />
    </main>
  );
}
