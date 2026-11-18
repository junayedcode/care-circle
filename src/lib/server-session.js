import { headers } from "next/headers";
import { auth, reconnectMongo } from "@/lib/auth";

// Reading the session is a best-effort operation for server components.
//
// Better Auth stores sessions in MongoDB. If Atlas is unreachable (paused
// cluster, stale/closed topology, network blip) the lookup throws, which in a
// server component surfaces to users as "Minified React error #441" and takes
// down the whole page — including public pages that only need the session to
// personalise a button. Retry once after rebuilding the Mongo topology, then
// fall back to "signed out" so the page still renders.
export async function getServerSession() {
  const requestHeaders = await headers();

  // Without a session cookie Better Auth returns null without touching Mongo.
  // Short-circuit here so signed-out visitors never wait on (or depend on) the
  // database just to view a public page.
  if (!hasSessionCookie(requestHeaders.get("cookie"))) return null;

  try {
    return await auth.api.getSession({ headers: requestHeaders });
  } catch (error) {
    console.error(
      "[auth] Session lookup failed:",
      error?.message || error
    );

    // Rebuilding a closed topology is the recoverable case this retry exists
    // for. If Atlas itself is down, the second attempt fails the same way and
    // we fall back to the signed-out state below.
    if (!isClosedTopologyError(error)) return null;
  }

  try {
    await reconnectMongo();
    return await auth.api.getSession({ headers: requestHeaders });
  } catch (error) {
    console.error(
      "[auth] Session lookup failed again, continuing as signed out:",
      error?.message || error
    );
    return null;
  }
}

function hasSessionCookie(cookieHeader) {
  if (!cookieHeader) return false;

  return /(?:^|;\s*)(?:__Secure-)?better-auth\.session_token=/.test(cookieHeader);
}

function isClosedTopologyError(error) {
  // Better Auth wraps database failures in an APIError, keeping the driver
  // error on `cause`, so inspect the whole chain.
  let current = error;

  for (let depth = 0; current && depth < 5; depth += 1) {
    const name = String(current.name || "");
    const message = String(current.message || "");

    if (
      name === "MongoTopologyClosedError" ||
      /topology (is|was) closed|client (is|was) closed/i.test(message)
    ) {
      return true;
    }

    // Atlas is not answering; reconnecting now would just wait out another
    // server selection timeout before we fall back.
    if (
      name === "MongoServerSelectionError" ||
      /server selection timed out|ECONNREFUSED|ENOTFOUND/i.test(message)
    ) {
      return false;
    }

    current = current.cause;
  }

  return false;
}
