import nodemailer from "nodemailer";

// Support multiple providers via SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export interface SendEmailOptions {
  to: string;
  from?: string;
  fromName?: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  trackingId?: string; // For open tracking
  unsubscribeUrl?: string;
}

export async function sendEmail(options: SendEmailOptions): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const fromAddress = options.from || process.env.SMTP_FROM || process.env.SMTP_USER;
    const fromName = options.fromName || "LeadGen AI";

    let html = options.html;

    // Add unsubscribe link if provided
    if (options.unsubscribeUrl) {
      html += `<br><br><p style="font-size:11px;color:#666;">
        <a href="${options.unsubscribeUrl}" style="color:#666;">Se d\u00e9sabonner</a>
      </p>`;
    }

    // Add tracking pixel if trackingId provided
    if (options.trackingId) {
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
      html += `<img src="${appUrl}/api/track/open?id=${options.trackingId}" width="1" height="1" style="display:none" />`;
    }

    const info = await transporter.sendMail({
      from: `"${fromName}" <${fromAddress}>`,
      to: options.to,
      subject: options.subject,
      text: options.text || options.html.replace(/<[^>]*>/g, ""),
      html,
      replyTo: options.replyTo || fromAddress,
      headers: options.unsubscribeUrl ? {
        "List-Unsubscribe": `<${options.unsubscribeUrl}>`,
      } : undefined,
    });

    return { success: true, messageId: info.messageId };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Unknown error" };
  }
}

export async function sendBulkEmails(
  emails: SendEmailOptions[],
  delayMs: number = 2000 // 2s between emails to avoid spam
): Promise<{ sent: number; failed: number; results: { to: string; success: boolean; error?: string }[] }> {
  const results: { to: string; success: boolean; error?: string }[] = [];
  let sent = 0;
  let failed = 0;

  for (const email of emails) {
    const result = await sendEmail(email);
    results.push({ to: email.to, success: result.success, error: result.error });
    if (result.success) sent++;
    else failed++;

    // Delay between emails
    if (delayMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  return { sent, failed, results };
}
