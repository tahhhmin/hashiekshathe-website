// src/lib/authOptions.ts
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import clientPromise from "@/lib/mongoDB";

export const authOptions = (): NextAuthOptions => {
  // Environment variables are read at runtime, not build time
  const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
  const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;

  if (!GOOGLE_CLIENT_ID) {
    throw new Error("Missing environment variable: GOOGLE_CLIENT_ID");
  }
  if (!GOOGLE_CLIENT_SECRET) {
    throw new Error("Missing environment variable: GOOGLE_CLIENT_SECRET");
  }
  if (!NEXTAUTH_SECRET) {
    throw new Error("Missing environment variable: NEXTAUTH_SECRET");
  }

  return {
    providers: [
      GoogleProvider({
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
      }),
    ],
    secret: NEXTAUTH_SECRET,

    session: {
      strategy: "jwt",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    },

    callbacks: {
      async jwt({ token, user, trigger }) {
        console.log("🟢 JWT CALLBACK START");
        console.log("JWT - Trigger:", trigger);
        console.log("JWT - Token:", JSON.stringify(token, null, 2));
        console.log("JWT - User:", JSON.stringify(user, null, 2));

        if (user) {
          const userData = await fetchUserData(user.email!);

          token.id = userData.id;
          token.email = userData.email;
          token.name = userData.name;
          token.image = userData.image;
          token.isAdmin = userData.isAdmin;
          token.createdAt = userData.createdAt;
        }

        const shouldRefresh =
          token.lastFetch &&
          Date.now() - (token.lastFetch as number) > 60 * 60 * 1000;

        if (shouldRefresh && token.email) {
          try {
            const userData = await fetchUserData(token.email as string);
            token.isAdmin = userData.isAdmin;
            token.lastFetch = Date.now();
          } catch (error) {
            console.error("JWT - Error refreshing user data:", error);
          }
        }

        if (!token.lastFetch) {
          token.lastFetch = Date.now();
        }

        console.log("🟢 JWT CALLBACK END\n");
        return token;
      },

      async session({ session, token }) {
        console.log("🟡 SESSION CALLBACK START");
        console.log("Session - Token:", JSON.stringify(token, null, 2));

        if (token && session.user) {
          session.user.id = token.id as string;
          session.user.email = token.email as string;
          session.user.name = token.name as string;
          session.user.image = token.image as string;
          session.user.isAdmin = token.isAdmin as boolean;
          session.user.createdAt = token.createdAt as Date;
        }

        console.log("Session - Final session:", JSON.stringify(session, null, 2));
        console.log("🟡 SESSION CALLBACK END\n");
        return session;
      },

      async signIn({ user, account }) {
        console.log("🔵 SIGNIN CALLBACK START");
        console.log("SignIn - User:", JSON.stringify(user, null, 2));
        console.log("SignIn - Account:", JSON.stringify(account, null, 2));

        try {
          await upsertUser(user);
          console.log("✅ SignIn - User upserted successfully");
          return true;
        } catch (error) {
          console.error("❌ SignIn - Error upserting user:", error);
          return false;
        }
      },
    },

    pages: {
      signIn: "/login",
    },
  };
};

// Fetch user data from MongoDB
async function fetchUserData(email: string) {
  console.log("📥 Fetching user data for email:", email);

  const client = await clientPromise;
  const db = client.db();
  const usersCollection = db.collection("users");

  const user = await usersCollection.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  return {
    id: user._id.toString(),
    email: user.email,
    name: user.name,
    image: user.image,
    isAdmin: user.isAdmin ?? false,
    createdAt: user.createdAt,
  };
}

// Insert or update user in MongoDB after sign-in
async function upsertUser(user: {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}) {
  console.log("💾 Upserting user:", JSON.stringify(user, null, 2));

  const client = await clientPromise;
  const db = client.db();
  const usersCollection = db.collection("users");

  const existingUser = await usersCollection.findOne({ email: user.email });

  if (existingUser) {
    console.log("💾 User exists, updating...");
    const updateData: Partial<typeof user> & { updatedAt?: Date; isAdmin?: boolean } = {};

    if (existingUser.name !== user.name) updateData.name = user.name ?? "";
    if (existingUser.image !== user.image) updateData.image = user.image ?? "";

    if (existingUser.isAdmin === undefined) {
      updateData.isAdmin = false;
    }

    if (Object.keys(updateData).length > 0) {
      updateData.updatedAt = new Date();

      await usersCollection.updateOne(
        { email: user.email },
        { $set: updateData }
      );
      console.log("✅ User updated with data:", updateData);
    }
  } else {
    console.log("💾 Creating new user...");
    const newUser = {
      name: user.name ?? "",
      email: user.email ?? "",
      image: user.image ?? "",
      isAdmin: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await usersCollection.insertOne(newUser);
    console.log("✅ New user created:", newUser);
  }
}