import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongoDB";
import { connectDB } from "@/lib/connectDB";
import { User } from "@/models/User";
import type { NextAuthOptions } from "next-auth";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NEXTAUTH_SECRET } from "@/lib/env";

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
      if (user) {
        token.id = user.id;

        await connectDB();
        const dbUser = await User.findById(user.id).lean();
        token.isAdmin = dbUser?.isAdmin ?? false;
      }
      return token;
    },

    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  events: {
    async createUser({ user }) {
      await connectDB();
      await User.findByIdAndUpdate(
        user.id,
        {
          $setOnInsert: {
            isAdmin: false,
            createdAt: new Date(),
          },
        },
        { upsert: true }
      );
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
