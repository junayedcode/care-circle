import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const mongoUrl = process.env.MONGODB_URL;

if (!mongoUrl) {
  throw new Error("MONGODB_URL is missing");
}

if (!process.env.BETTER_AUTH_SECRET) {
  throw new Error("BETTER_AUTH_SECRET is missing");
}

// Reuse one MongoClient per server process. On Vercel a single function
// instance serves many requests, and modules may be evaluated more than once
// (dev HMR, separate route workers). Caching on globalThis keeps a single
// connection pool instead of leaking a new client each time.
//
// serverSelectionTimeoutMS is shortened from the 30s driver default: if Atlas
// is paused or unreachable, a server render must fail fast (and fall back to
// the signed-out view) instead of hanging until the function times out.
const globalForMongo = globalThis;

const mongoClient =
  globalForMongo.__careCircleMongoClient ??
  new MongoClient(mongoUrl, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000,
    maxPoolSize: 10,
    retryWrites: true,
  });

globalForMongo.__careCircleMongoClient = mongoClient;

const db = mongoClient.db("care-circle");

// The MongoDB driver closes the active topology when an initial connection
// attempt fails (Atlas "ReplicaSetNoPrimary" / server selection timeout). Later
// operations on that client then throw MongoTopologyClosedError. Calling
// connect() recreates the topology, so a transient outage can recover without a
// cold start. connect() is idempotent and de-duplicates concurrent calls.
export async function reconnectMongo() {
  try {
    await mongoClient.connect();
    return true;
  } catch (error) {
    console.error(
      "[mongo] Reconnect failed:",
      error?.message || error
    );
    return false;
  }
}

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,

  secret: process.env.BETTER_AUTH_SECRET,

  database: mongodbAdapter(db, {
    client: mongoClient,
  }),

  trustedOrigins: [
    "http://localhost:3000",
    "https://care-circle-navy-one.vercel.app",
  ],

  emailAndPassword: {
    enabled: true,
  },

  user: {
    changeEmail: {
      enabled: true,
      updateEmailWithoutVerification: true,
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      overrideUserInfoOnSignIn: true,
    },
  },

  plugins: [
    jwt(),
  ],
    session: {
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge: 7 * 24 * 60 * 60,
    },
  },
});
