/**
 * GÉNÉRATEUR D'EMAILS DE PROSPECTION IA
 *
 * Utilise Claude API pour générer des emails personnalisés
 * basés sur les données du lead.
 */

import Anthropic from "@anthropic-ai/sdk";
import type { Lead, ProspectionEmail } from "@/types/lead";

// Le client est initialisé avec ANTHROPIC_API_KEY depuis les variables d'env
function getClient(): Anthropic {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY manquante dans les variables d'environnement");
  }
  return new Anthropic({ apiKey });
}

interface EmailGenerationOptions {
  lead: Lead;
  senderName: string;
  senderCompany: string;
  senderOffer: string; // Ce que tu vends
  tone: "formal" | "casual" | "friendly";
  language?: "fr" | "en";
}

/**
 * Génère un email de prospection personnalisé pour un lead
 */
export async function generateProspectionEmail(
  options: EmailGenerationOptions
): Promise<ProspectionEmail> {
  const { lead, senderName, senderCompany, senderOffer, tone, language = "fr" } = options;

  const client = getClient();

  const toneInstructions = {
    formal: "Ton professionnel et formel, vouvoiement.",
    casual: "Ton décontracté mais professionnel, tutoiement possible.",
    friendly: "Ton amical et chaleureux, comme un message à un contact.",
  };

  const prompt = `Tu es un expert en copywriting de prospection B2B.

Génère un email de prospection PERSONNALISÉ pour ce lead :

INFORMATIONS SUR LE LEAD :
- Entreprise : ${lead.company}
- Site web : ${lead.website}
- Secteur : ${lead.sector}
- Ville : ${lead.city || "Non spécifiée"}
- Email de contact : ${lead.emails[0] || "Non trouvé"}
${lead.socialProfiles.linkedin ? `- LinkedIn : ${lead.socialProfiles.linkedin}` : ""}

INFORMATIONS SUR L'EXPÉDITEUR :
- Nom : ${senderName}
- Entreprise : ${senderCompany}
- Offre : ${senderOffer}

CONSIGNES :
- ${toneInstructions[tone]}
- Langue : ${language === "fr" ? "Français" : "English"}
- L'objet doit faire max 50 caractères et susciter la curiosité
- Le corps doit faire 4-6 lignes MAX
- Personnalise avec le nom de l'entreprise et son secteur
- Inclus un CTA clair (appel, réponse, lien)
- PAS de formules cliché ("je me permets de vous contacter...")
- PAS de spam vibes — sois humain et utile

Réponds UNIQUEMENT au format JSON :
{
  "subject": "l'objet de l'email",
  "body": "le corps de l'email"
}`;

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 500,
    messages: [{ role: "user", content: prompt }],
  });

  // Parser la réponse
  const text = response.content[0].type === "text" ? response.content[0].text : "";

  // Extraire le JSON de la réponse
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Réponse IA invalide : pas de JSON trouvé");
  }

  const parsed = JSON.parse(jsonMatch[0]);

  return {
    to: lead.emails[0] || "",
    subject: parsed.subject,
    body: parsed.body,
    tone,
  };
}

/**
 * Génère des emails pour une liste de leads (en séquentiel pour respecter les rate limits)
 */
export async function generateBulkEmails(
  leads: Lead[],
  options: Omit<EmailGenerationOptions, "lead">
): Promise<{ lead: Lead; email: ProspectionEmail; error?: string }[]> {
  const results: { lead: Lead; email: ProspectionEmail; error?: string }[] = [];

  for (const lead of leads) {
    try {
      // Petite pause entre les appels pour les rate limits
      if (results.length > 0) {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      const email = await generateProspectionEmail({ ...options, lead });
      results.push({ lead, email });
    } catch (error) {
      results.push({
        lead,
        email: { to: "", subject: "", body: "", tone: options.tone },
        error: error instanceof Error ? error.message : "Erreur inconnue",
      });
    }
  }

  return results;
}

/**
 * Génère des variations A/B d'un email pour tester
 */
export async function generateEmailVariations(
  options: EmailGenerationOptions,
  count: number = 3
): Promise<ProspectionEmail[]> {
  const variations: ProspectionEmail[] = [];

  const tones: Array<"formal" | "casual" | "friendly"> = ["formal", "casual", "friendly"];

  for (let i = 0; i < Math.min(count, 3); i++) {
    const email = await generateProspectionEmail({
      ...options,
      tone: tones[i % tones.length],
    });
    variations.push(email);

    if (i < count - 1) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  return variations;
}
