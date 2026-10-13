const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

type Web3FormsFields = Record<string, string>;

/**
 * Sends a notification email through Web3Forms. Must run in the browser: Web3Forms' Cloudflare
 * bot protection TLS-fingerprints the caller and rejects server-to-server requests (even Node's
 * own fetch, regardless of headers) — only real browser traffic reliably gets through.
 * Never throws: logs and swallows failures so a missing/invalid key can't break a form.
 */
export async function sendWeb3FormsEmail(subject: string, fields: Web3FormsFields) {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    console.warn("NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY is not set; skipping email notification.");
    return;
  }

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ access_key: accessKey, subject, ...fields }),
    });
    const payload = (await response.json().catch(() => null)) as { success?: boolean; message?: string } | null;
    if (!response.ok || !payload?.success) {
      console.error("Web3Forms notification failed", payload?.message || response.statusText);
    }
  } catch (error) {
    console.error("Web3Forms notification failed", error);
  }
}
