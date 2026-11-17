import { authClient } from "./auth-client";


export async function authFetch(url, options = {}) {
  const { data, error } = await authClient.token();

  if (error || !data?.token) {
    throw new Error("Please login first.");
  }

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${data.token}`,
    },
  });
}
