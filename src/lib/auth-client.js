import { createAuthClient } from "better-auth/react";

// No baseURL needed: the Better Auth API is served same-origin at /api/auth/*,
// so the client falls back to window.location.origin automatically.
// (process.env.BETTER_AUTH_URL is a server-only variable — it was always
// `undefined` in the browser, so passing it here never did anything.)
export const authClient = createAuthClient();
