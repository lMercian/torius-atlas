import { Resend } from "resend";
import { ENV } from "./env";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendApplicationConfirmationEmail(
  recipientEmail: string,
  brandName: string,
  contactName: string
) {
  try {
    const result = await resend.emails.send({
      from: "Torius Atlas <info@toriusatlas.com>",
      to: recipientEmail,
      subject: `Application Received - ${brandName}`,
      html: `
        <div style="font-family: 'Source Serif 4', serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <h1 style="font-family: 'Bebas Neue', sans-serif; font-size: 32px; letter-spacing: 0.03em; color: #0A0A0A; margin-bottom: 20px;">
            THANK YOU
          </h1>
          <p style="font-size: 16px; color: #0A0A0A; line-height: 1.6; margin-bottom: 20px;">
            Dear ${contactName},
          </p>
          <p style="font-size: 16px; color: #0A0A0A/65; line-height: 1.6; margin-bottom: 20px;">
            We have received your application for <strong>${brandName}</strong> to participate in Torius Atlas pop-up events.
          </p>
          <p style="font-size: 16px; color: #0A0A0A/65; line-height: 1.6; margin-bottom: 20px;">
            Our team will review your submission and get back to you within 48 hours with next steps and event placement opportunities.
          </p>
          <p style="font-size: 16px; color: #0A0A0A/65; line-height: 1.6; margin-bottom: 30px;">
            In the meantime, feel free to reach out with any questions:
          </p>
          <div style="background-color: #F0EBE3; padding: 20px; border-radius: 4px; margin-bottom: 30px;">
            <p style="margin: 0 0 10px 0; font-size: 14px;">
              <strong>Email:</strong> info@toriusatlas.com
            </p>
            <p style="margin: 0; font-size: 14px;">
              <strong>Phone:</strong> +1 346 823 4535
            </p>
          </div>
          <p style="font-size: 14px; color: #8A8A8A; line-height: 1.6;">
            Best regards,<br/>
            <strong>Torius Atlas Team</strong><br/>
            <em>Bringing Turkish Brands to America</em>
          </p>
        </div>
      `,
    });

    if (result.error) {
      console.error("[Email] Failed to send confirmation email:", result.error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("[Email] Error sending confirmation email:", error);
    return false;
  }
}

export async function sendApplicationNotificationEmail(
  brandName: string,
  contactName: string,
  email: string,
  category?: string,
  message?: string
) {
  try {
    const result = await resend.emails.send({
      from: "Torius Atlas <info@toriusatlas.com>",
      to: "info@toriusatlas.com",
      subject: `New Brand Application: ${brandName}`,
      html: `
        <div style="font-family: 'Source Serif 4', serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <h2 style="font-family: 'Bebas Neue', sans-serif; font-size: 24px; letter-spacing: 0.03em; color: #C8102E; margin-bottom: 20px;">
            NEW BRAND APPLICATION
          </h2>
          <div style="background-color: #F0EBE3; padding: 20px; border-radius: 4px; margin-bottom: 20px;">
            <p style="margin: 0 0 10px 0;"><strong>Brand Name:</strong> ${brandName}</p>
            <p style="margin: 0 0 10px 0;"><strong>Contact Name:</strong> ${contactName}</p>
            <p style="margin: 0 0 10px 0;"><strong>Email:</strong> ${email}</p>
            ${category ? `<p style="margin: 0 0 10px 0;"><strong>Category:</strong> ${category}</p>` : ""}
            <p style="margin: 0;"><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          </div>
          ${message ? `
            <div style="background-color: #FAFAFA; padding: 20px; border-left: 4px solid #C8102E; margin-bottom: 20px;">
              <p style="margin: 0; font-size: 14px; color: #0A0A0A/65;"><strong>Message:</strong></p>
              <p style="margin: 10px 0 0 0; font-size: 14px; color: #0A0A0A/65; line-height: 1.6;">${message}</p>
            </div>
          ` : ""}
          <p style="font-size: 12px; color: #8A8A8A;">
            Review this application in your Manus dashboard to approve, reject, or waitlist.
          </p>
        </div>
      `,
    });

    if (result.error) {
      console.error("[Email] Failed to send notification email:", result.error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("[Email] Error sending notification email:", error);
    return false;
  }
}
