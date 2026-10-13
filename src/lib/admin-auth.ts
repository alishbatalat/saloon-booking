import crypto from "crypto";

export const ADMIN_SESSION_COOKIE = "orielle_admin_session";

function sessionToken() {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  if (!username || !password) return null;
  return crypto.createHash("sha256").update(`${username}:${password}`).digest("hex");
}

export function checkAdminCredentials(username: string, password: string) {
  return (
    Boolean(process.env.ADMIN_USERNAME) &&
    Boolean(process.env.ADMIN_PASSWORD) &&
    username.trim().toLowerCase() === process.env.ADMIN_USERNAME?.toLowerCase() &&
    password === process.env.ADMIN_PASSWORD
  );
}

export function adminSessionValue() {
  return sessionToken();
}

export function isValidAdminSession(cookieValue: string | undefined) {
  const expected = sessionToken();
  return Boolean(expected) && cookieValue === expected;
}

export function adminDisplayName() {
  const username = process.env.ADMIN_USERNAME;
  if (!username) return "Admin";
  return username.charAt(0).toUpperCase() + username.slice(1);
}
