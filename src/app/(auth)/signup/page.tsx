"use client";

import { useState } from "react";
import { createSupabaseBrowser } from "@/lib/auth/supabase-browser";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      setLoading(false);
      return;
    }

    const supabase = createSupabaseBrowser();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 hero-gradient">
        <div className="w-full max-w-md text-center animate-fade-in-up">
          <div className="gradient-border bg-gray-900/80 backdrop-blur-sm rounded-2xl p-10">
            <div className="w-16 h-16 bg-green-900/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Compte créé !</h2>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Vérifiez votre email pour confirmer votre compte, puis connectez-vous.
            </p>
            <Link
              href="/login"
              className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
            >
              Aller à la connexion
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 hero-gradient">
      <div className="w-full max-w-md animate-fade-in-up">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-lg font-bold mx-auto mb-4">
            L
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            LeadGen AI
          </h1>
          <p className="text-gray-500 mt-2 text-sm">Créez votre compte gratuitement</p>
        </div>

        <form onSubmit={handleSignup} className="gradient-border bg-gray-900/80 backdrop-blur-sm rounded-2xl p-7 space-y-5">
          {error && (
            <div className="bg-red-900/20 border border-red-800/50 rounded-lg p-3 text-red-400 text-sm flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm text-gray-400 mb-2 font-medium">Nom complet</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Jean Dupont"
              required
              className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all duration-200 placeholder:text-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vous@exemple.fr"
              required
              className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all duration-200 placeholder:text-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2 font-medium">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 caractères"
              required
              minLength={6}
              className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all duration-200 placeholder:text-gray-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed py-3 rounded-xl text-sm font-medium transition-all duration-200"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Création...
              </span>
            ) : "Créer mon compte"}
          </button>

          <p className="text-center text-sm text-gray-500">
            Déjà un compte ?{" "}
            <Link href="/login" className="text-indigo-400 hover:text-indigo-300 transition-colors">
              Se connecter
            </Link>
          </p>
        </form>

        <p className="text-center text-xs text-gray-600 mt-5">
          Plan Free : 10 leads/mois, 5 emails IA, 50 vérifications
        </p>
      </div>
    </div>
  );
}
