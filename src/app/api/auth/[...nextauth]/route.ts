// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongoDB";
import type { NextAuthOptions } from "next-auth";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  NEXTAUTH_SECRET,
} from "@/lib/env";
import { ObjectId } from "mongodb";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      const client = await clientPromise;
      const db = client.db();
      const usersCollection = db.collection("users");

      // On first login, set token.id from user
      if (user) {
        token.id = user.id || (user as any)._id;
      }

      if (token.id) {
        const dbUser = await usersCollection.findOne({
          _id: new ObjectId(token.id),
        });

        token.isAdmin = dbUser?.isAdmin ?? false;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user && token?.id) {
        session.user.id = token.id as string;
        session.user.isAdmin = token.isAdmin ?? false;
      }

      console.log("Session callback - session.user:", session.user);
      return session;
    },
  },

  events: {
    async signIn({ user }) {
      const client = await clientPromise;
      const db = client.db();
      const usersCollection = db.collection("users");

      const userId = user.id || (user as any)._id;
      const objUserId = new ObjectId(userId);

      const existingUser = await usersCollection.findOne({
        _id: objUserId,
      });

      if (existingUser) {
        const updateData: Record<string, any> = {};

        if (existingUser.isAdmin === undefined) {
          updateData.isAdmin = false;
        }

        if (Object.keys(updateData).length > 0) {
          await usersCollection.updateOne(
            { _id: objUserId },
            { $set: updateData }
          );
          console.log("User fields updated on signIn:", updateData);
        }
      }
    },
  },

  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
