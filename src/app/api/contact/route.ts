import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { quoteFormSchema } from '@/lib/validations';
import { createServerSupabaseClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const result = quoteFormSchema.safeParse(body);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return NextResponse.json(
        { error: 'Validation failed', details: errors },
        { status: 400 }
      );
    }

    const data = result.data;

    // Save enquiry to database first (best-effort — don't fail if DB is unavailable)
    try {
      const supabase = createServerSupabaseClient();
      if (supabase) {
        await supabase.from('enquiries').insert({
          full_name: data.fullName,
          email: data.email,
          phone: data.phone || null,
          company: data.company || null,
          country: data.country || null,
          products: data.products,
          quantity: data.quantity || null,
          message: data.additionalNotes || null,
        });
      }
    } catch (dbError) {
      console.error('[Contact API] Failed to save enquiry to database:', dbError);
    }

    // Check if SMTP is configured
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpFrom = process.env.SMTP_FROM;

    if (!smtpHost || !smtpPort || !smtpUser || !smtpPass || !smtpFrom) {
      console.warn(
        '[Contact API] SMTP is not fully configured. Skipping email delivery. ' +
          'Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and SMTP_FROM in your .env file.'
      );
      return NextResponse.json({ success: true });
    }

    // Create the transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(smtpPort),
      secure: Number(smtpPort) === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Build the enquiry email HTML for the company
    const enquiryHtml = buildEnquiryEmail(data);

    // Build the confirmation email HTML for the submitter
    const confirmationHtml = buildConfirmationEmail(data);

    // Send both emails concurrently
    await Promise.all([
      transporter.sendMail({
        from: smtpFrom,
        to: 'general@aszcompany.com',
        subject: `New Quote Request from ${data.fullName}`,
        html: enquiryHtml,
      }),
      transporter.sendMail({
        from: smtpFrom,
        to: data.email,
        subject: 'We received your quote request - ASZ Company FZCO',
        html: confirmationHtml,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Contact API] Error processing request:', error);
    return NextResponse.json(
      { error: 'Failed to process your request. Please try again later.' },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// Email template helpers
// ---------------------------------------------------------------------------

function row(label: string, value: string | string[] | undefined): string {
  if (!value || (Array.isArray(value) && value.length === 0)) return '';
  const display = Array.isArray(value) ? value.join(', ') : value;
  return `
    <tr>
      <td style="padding:10px 14px;font-weight:600;color:#374151;border-bottom:1px solid #e5e7eb;width:200px;vertical-align:top;">${label}</td>
      <td style="padding:10px 14px;color:#1f2937;border-bottom:1px solid #e5e7eb;">${display}</td>
    </tr>`;
}

function wrapEmail(title: string, body: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
<body style="margin:0;padding:0;background-color:#f3f4f6;font-family:'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f3f4f6;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
        <!-- Header -->
        <tr>
          <td style="background-color:#0f172a;padding:28px 32px;text-align:center;">
            <h1 style="margin:0;font-size:22px;color:#ffffff;letter-spacing:0.5px;">ASZ Company FZCO</h1>
          </td>
        </tr>
        <!-- Title -->
        <tr>
          <td style="padding:28px 32px 8px 32px;">
            <h2 style="margin:0;font-size:18px;color:#0f172a;">${title}</h2>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:8px 32px 32px 32px;">
            ${body}
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background-color:#f9fafb;padding:20px 32px;text-align:center;border-top:1px solid #e5e7eb;">
            <p style="margin:0;font-size:12px;color:#9ca3af;">&copy; ${new Date().getFullYear()} ASZ Company FZCO. All rights reserved.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

interface FormData {
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  country?: string;
  products: string[];
  quantity?: string;
  sizing?: string;
  packing?: string;
  deliveryTerms?: string;
  preferredDeliveryDate?: string;
  howHeard?: string;
  additionalNotes?: string;
}

function buildEnquiryEmail(data: FormData): string {
  const rows = [
    row('Full Name', data.fullName),
    row('Email', data.email),
    row('Phone', data.phone),
    row('Company', data.company),
    row('Country', data.country),
    row('Products', data.products),
    row('Quantity', data.quantity),
    row('Sizing', data.sizing),
    row('Packing', data.packing),
    row('Delivery Terms', data.deliveryTerms),
    row('Preferred Delivery Date', data.preferredDeliveryDate),
    row('How They Heard About Us', data.howHeard),
    row('Additional Notes', data.additionalNotes),
  ].join('');

  const body = `
    <p style="margin:0 0 16px 0;color:#4b5563;line-height:1.6;">A new quote request has been submitted via the website. Details are below:</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:6px;overflow:hidden;">
      ${rows}
    </table>`;

  return wrapEmail('New Quote Request', body);
}

function buildConfirmationEmail(data: FormData): string {
  const body = `
    <p style="margin:0 0 16px 0;color:#4b5563;line-height:1.6;">Dear ${data.fullName},</p>
    <p style="margin:0 0 16px 0;color:#4b5563;line-height:1.6;">
      Thank you for reaching out to <strong>ASZ Company FZCO</strong>. We have received your quote request and our team is reviewing the details.
    </p>
    <p style="margin:0 0 16px 0;color:#4b5563;line-height:1.6;">
      One of our representatives will get back to you shortly. If you have any urgent queries in the meantime, feel free to reply to this email or contact us at
      <a href="mailto:general@aszcompany.com" style="color:#2563eb;text-decoration:none;">general@aszcompany.com</a>.
    </p>
    <div style="margin:24px 0;padding:16px 20px;background-color:#f0f9ff;border-left:4px solid #2563eb;border-radius:4px;">
      <p style="margin:0;font-size:14px;color:#374151;"><strong>Your requested products:</strong> ${data.products.join(', ')}</p>
    </div>
    <p style="margin:0;color:#4b5563;line-height:1.6;">
      Best regards,<br /><strong>ASZ Company FZCO</strong>
    </p>`;

  return wrapEmail('Thank You for Your Enquiry', body);
}
