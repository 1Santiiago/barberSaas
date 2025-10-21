export type AuthPayload = {
  user: string;
  token: string;
};

const COOKIE_NAME = "sb_auth";
const COOKIE_EXPIRE_DAYS = 1;

function encodePayload(payload: AuthPayload) {
  return btoa(JSON.stringify(payload));
}

function decodePayload(encoded: string) {
  try {
    return JSON.parse(atob(encoded)) as AuthPayload;
  } catch {
    return null;
  }
}

export function setAuthCookie(payload: AuthPayload) {
  const value = encodePayload(payload);
  const expires = new Date();
  expires.setDate(expires.getDate() + COOKIE_EXPIRE_DAYS);
  document.cookie = `${COOKIE_NAME}=${value}; path=/; expires=${expires.toUTCString()}`;
  console.log("✅ Cookie salvo:", document.cookie);
}

export function getAuthCookie(): AuthPayload | null {
  const name = COOKIE_NAME + "=";
  const parts = document.cookie.split(";").map((p) => p.trim());
  const found = parts.find((p) => p.startsWith(name));
  if (!found) return null;
  const val = found.substring(name.length);
  return decodePayload(val);
}

export function clearAuthCookie() {
  document.cookie = `${COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  console.log("🧹 Cookie limpo");
}

const MOCK_USERS: Record<string, { password: string; token: string }> = {
  admin: { password: "123456", token: "tok_admin_abc" },
  joao: { password: "senha123", token: "tok_joao_456" },
};

export async function verifyCredentials(
  username: string,
  password: string
): Promise<AuthPayload | null> {
  await new Promise((r) => setTimeout(r, 500));
  const u = MOCK_USERS[username];
  if (u && u.password === password) {
    return { user: username, token: u.token };
  }
  return null;
}
