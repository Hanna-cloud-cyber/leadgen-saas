/**
 * Helpers DB — Fonctions pour sauvegarder et lire les données Supabase
 */

import { SupabaseClient } from "@supabase/supabase-js";
import type { Lead, Contact } from "@/types/lead";

// ═══════════════════════════════════════════
// LEADS
// ═══════════════════════════════════════════

export async function saveLeads(
  supabase: SupabaseClient,
  userId: string,
  leads: Lead[]
) {
  const rows = leads.map((lead) => ({
    user_id: userId,
    company: lead.company,
    website: lead.website,
    emails: lead.emails,
    phone: lead.phone || null,
    address: lead.address || null,
    sector: lead.sector || null,
    city: lead.city || null,
    country: lead.country || "France",
    linkedin: lead.socialProfiles?.linkedin || null,
    twitter: lead.socialProfiles?.twitter || null,
    facebook: lead.socialProfiles?.facebook || null,
    instagram: lead.socialProfiles?.instagram || null,
    score: lead.score,
    source: lead.source || "google",
  }));

  const { data, error } = await supabase.from("leads").insert(rows).select();
  if (error) throw error;
  return data;
}

export async function getLeads(
  supabase: SupabaseClient,
  userId: string,
  options?: { limit?: number; offset?: number; status?: string }
) {
  let query = supabase
    .from("leads")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (options?.status) query = query.eq("status", options.status);
  if (options?.limit) query = query.limit(options.limit);
  if (options?.offset) query = query.range(options.offset, options.offset + (options.limit || 20) - 1);

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getLeadCount(supabase: SupabaseClient, userId: string) {
  const { count, error } = await supabase
    .from("leads")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);
  if (error) throw error;
  return count || 0;
}

// ═══════════════════════════════════════════
// CONTACTS
// ═══════════════════════════════════════════

export async function saveContacts(
  supabase: SupabaseClient,
  userId: string,
  contacts: Contact[]
) {
  const rows = contacts.map((c) => ({
    user_id: userId,
    first_name: c.firstName,
    last_name: c.lastName,
    full_name: c.fullName,
    email: c.email || null,
    email_guesses: c.emailGuesses || [],
    phone: c.phone || null,
    mobile: c.mobile || null,
    job_title: c.jobTitle || null,
    company: c.company || null,
    company_website: c.companyWebsite || null,
    linkedin: c.linkedin || null,
    twitter: c.twitter || null,
    city: c.city || null,
    country: c.country || "France",
    source: c.source || "google",
    score: c.score,
  }));

  const { data, error } = await supabase.from("contacts").insert(rows).select();
  if (error) throw error;
  return data;
}

export async function getContacts(
  supabase: SupabaseClient,
  userId: string,
  options?: { limit?: number; offset?: number }
) {
  let query = supabase
    .from("contacts")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (options?.limit) query = query.limit(options.limit);
  if (options?.offset) query = query.range(options.offset, options.offset + (options.limit || 20) - 1);

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

// ═══════════════════════════════════════════
// SEARCHES (historique)
// ═══════════════════════════════════════════

export async function saveSearch(
  supabase: SupabaseClient,
  userId: string,
  search: {
    keywords: string;
    city?: string;
    country?: string;
    resultsCount: number;
    leadsFound: number;
    emailsFound: number;
    durationMs: number;
  }
) {
  const { error } = await supabase.from("searches").insert({
    user_id: userId,
    keywords: search.keywords,
    city: search.city || null,
    country: search.country || "France",
    results_count: search.resultsCount,
    leads_found: search.leadsFound,
    emails_found: search.emailsFound,
    duration_ms: search.durationMs,
  });
  if (error) throw error;
}

// ═══════════════════════════════════════════
// GENERATED EMAILS
// ═══════════════════════════════════════════

export async function saveGeneratedEmail(
  supabase: SupabaseClient,
  userId: string,
  email: {
    leadId?: string;
    toEmail: string;
    subject: string;
    body: string;
    tone: string;
  }
) {
  const { data, error } = await supabase.from("generated_emails").insert({
    user_id: userId,
    lead_id: email.leadId || null,
    to_email: email.toEmail,
    subject: email.subject,
    body: email.body,
    tone: email.tone,
  }).select();
  if (error) throw error;
  return data;
}

// ═══════════════════════════════════════════
// PROFIL UTILISATEUR
// ═══════════════════════════════════════════

export async function getProfile(supabase: SupabaseClient, userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  if (error) throw error;
  return data;
}

export async function updateProfile(
  supabase: SupabaseClient,
  userId: string,
  updates: { full_name?: string; company_name?: string }
) {
  const { data, error } = await supabase
    .from("profiles")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", userId)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function incrementLeadsUsed(
  supabase: SupabaseClient,
  userId: string,
  count: number
) {
  const { error } = await supabase.rpc("increment_leads_used", {
    user_id_param: userId,
    count_param: count,
  });
  // If RPC doesn't exist yet, fallback to manual update
  if (error) {
    const profile = await getProfile(supabase, userId);
    await supabase
      .from("profiles")
      .update({ leads_used_this_month: profile.leads_used_this_month + count })
      .eq("id", userId);
  }
}

// ═══════════════════════════════════════════
// CAMPAIGNS
// ═══════════════════════════════════════════

export async function saveCampaign(
  supabase: SupabaseClient,
  userId: string,
  campaign: {
    name: string;
    sequence: unknown[];
    settings: Record<string, unknown>;
  }
) {
  const { data, error } = await supabase
    .from("campaigns")
    .insert({
      user_id: userId,
      name: campaign.name,
      status: "draft",
      sequence: campaign.sequence,
      settings: campaign.settings,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function getCampaigns(
  supabase: SupabaseClient,
  userId: string
) {
  const { data, error } = await supabase
    .from("campaigns")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function getCampaign(
  supabase: SupabaseClient,
  userId: string,
  campaignId: string
) {
  const { data, error } = await supabase
    .from("campaigns")
    .select("*")
    .eq("id", campaignId)
    .eq("user_id", userId)
    .single();
  if (error) throw error;
  return data;
}

export async function updateCampaign(
  supabase: SupabaseClient,
  userId: string,
  campaignId: string,
  updates: Record<string, unknown>
) {
  const { data, error } = await supabase
    .from("campaigns")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", campaignId)
    .eq("user_id", userId)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteCampaign(
  supabase: SupabaseClient,
  userId: string,
  campaignId: string
) {
  const { error } = await supabase
    .from("campaigns")
    .delete()
    .eq("id", campaignId)
    .eq("user_id", userId);
  if (error) throw error;
}

export async function addCampaignRecipients(
  supabase: SupabaseClient,
  campaignId: string,
  recipients: {
    email: string;
    firstName?: string;
    lastName?: string;
    company?: string;
    leadId?: string;
    contactId?: string;
  }[]
) {
  const rows = recipients.map((r) => ({
    campaign_id: campaignId,
    email: r.email,
    first_name: r.firstName || null,
    last_name: r.lastName || null,
    company: r.company || null,
    lead_id: r.leadId || null,
    contact_id: r.contactId || null,
    status: "pending",
    current_step: 0,
  }));

  const { data, error } = await supabase
    .from("campaign_recipients")
    .insert(rows)
    .select();
  if (error) throw error;
  return data;
}

export async function getCampaignRecipients(
  supabase: SupabaseClient,
  campaignId: string
) {
  const { data, error } = await supabase
    .from("campaign_recipients")
    .select("*")
    .eq("campaign_id", campaignId)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data;
}

export async function updateCampaignRecipient(
  supabase: SupabaseClient,
  recipientId: string,
  updates: Record<string, unknown>
) {
  const { data, error } = await supabase
    .from("campaign_recipients")
    .update(updates)
    .eq("id", recipientId)
    .select()
    .single();
  if (error) throw error;
  return data;
}
