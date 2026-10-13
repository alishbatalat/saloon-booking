/** Branded HTML email shell matching the site's look (serif wordmark, bronze accent, ink text). */
export function greetingEmailHtml({ name, subject }: { name: string; subject: string }) {
  return `<!doctype html>
<html>
  <body style="margin:0; padding:0; background:#f6f3ef; font-family:Georgia, 'Times New Roman', serif; color:#1c1c1c;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f3ef; padding:40px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" style="max-width:480px; background:#ffffff; border:1px solid #e6e1da;">
            <tr>
              <td style="padding:40px 40px 24px; text-align:center;">
                <div style="font-size:28px; letter-spacing:0.12em; color:#1c1c1c;">ORIELLE</div>
                <div style="margin-top:6px; font-size:10px; letter-spacing:0.36em; text-transform:uppercase; color:#1c1c1c; font-family:Arial, sans-serif;">Beauty Studio</div>
              </td>
            </tr>
            <tr>
              <td style="padding:0 40px 8px; border-top:1px solid #e6e1da;"></td>
            </tr>
            <tr>
              <td style="padding:32px 40px; font-family:Arial, sans-serif; font-size:15px; line-height:1.7; color:#1c1c1c;">
                <p style="margin:0 0 16px;">Hi ${name},</p>
                <p style="margin:0 0 16px;">
                  Thank you for reaching out to Orielle about "${subject}." We've received your message and someone from our desk will follow up with you shortly.
                </p>
                <p style="margin:0 0 16px;">
                  If you'd like to book in the meantime, you're welcome to reserve a time directly online.
                </p>
                <p style="margin:24px 0 0;">Warmly,<br />The Orielle Desk</p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 40px 32px; border-top:1px solid #e6e1da; font-family:Arial, sans-serif; font-size:11px; letter-spacing:0.08em; text-transform:uppercase; color:#8c7355; text-align:center;">
                Wilshire · Beverly Grove — Silver Lake · Sunset Blvd
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

/** Plain-text version of the same greeting. Gmail/most spam filters score HTML-only emails
 * (no text alternative) as more likely to be bulk/marketing mail — sending both parts helps. */
export function greetingEmailText({ name, subject }: { name: string; subject: string }) {
  return [
    `Hi ${name},`,
    "",
    `Thank you for reaching out to Orielle about "${subject}." We've received your message and someone from our desk will follow up with you shortly.`,
    "",
    "If you'd like to book in the meantime, you're welcome to reserve a time directly online.",
    "",
    "Warmly,",
    "The Orielle Desk",
    "",
    "Wilshire, Beverly Grove — Silver Lake, Sunset Blvd",
  ].join("\n");
}
