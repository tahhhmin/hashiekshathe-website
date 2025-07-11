// src/app/api/auth/[...nextauth]/route.ts
// ALTERNATIVE APPROACH: Using database sessions instead of JWT

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
  // FIXED: Use database sessions (default with adapter) and modify session callback accordingly

  callbacks: {
    // FIXED: For database sessions, we use the session callback differently
    async session({ session, user }) {
      console.log('🟢 SESSION CALLBACK START (Database Session)');
      console.log('Session - Initial session:', JSON.stringify(session, null, 2));
      console.log('Session - User from database:', JSON.stringify(user, null, 2));
      
      if (session.user && user) {
        // FIXED: Get isAdmin from database user object
        const client = await clientPromise;
        const db = client.db();
        const usersCollection = db.collection("users");
        
        const userId = user.id;
        console.log('Session - Looking up user with ID:', userId);
        
        let objUserId;
        try {
          objUserId = typeof userId === 'string' ? new ObjectId(userId) : userId;
        } catch (error) {
          console.error('❌ Session - Error converting userId to ObjectId:', error);
          return session;
        }

        const dbUser = await usersCollection.findOne({
          _id: objUserId,
        });

        console.log('Session - Database user found:', JSON.stringify(dbUser, null, 2));
        console.log('Session - dbUser.isAdmin:', dbUser?.isAdmin);
        
        session.user.id = user.id;
        session.user.isAdmin = dbUser?.isAdmin ?? false;
        
        console.log('Session - Final session.user.isAdmin:', session.user.isAdmin);
      }

      console.log('Session - Final session.user:', JSON.stringify(session.user, null, 2));
      console.log('🟢 SESSION CALLBACK END\n');
      return session;
    },
  },

  events: {
    async signIn({ user }) {
      console.log('🟡 SIGNIN EVENT START');
      console.log('SignIn - User object:', JSON.stringify(user, null, 2));
      
      const client = await clientPromise;
      const db = client.db();
      const usersCollection = db.collection("users");

      const userId = user.id || (user as any)._id;
      console.log('SignIn - userId extracted:', userId);
      console.log('SignIn - userId type:', typeof userId);
      
      // FIXED: Better ObjectId conversion handling
      let objUserId;
      try {
        objUserId = typeof userId === 'string' ? new ObjectId(userId) : userId;
        console.log('SignIn - Converted objUserId:', objUserId);
      } catch (error) {
        console.error('❌ SignIn - Error converting userId to ObjectId:', error);
        return;
      }

      const existingUser = await usersCollection.findOne({
        _id: objUserId,
      });

      console.log('SignIn - Existing user found:', JSON.stringify(existingUser, null, 2));
      console.log('SignIn - existingUser.isAdmin:', existingUser?.isAdmin);
      console.log('SignIn - existingUser.isAdmin type:', typeof existingUser?.isAdmin);

      if (existingUser) {
        const updateData: Record<string, any> = {};

        if (existingUser.isAdmin === undefined) {
          console.log('SignIn - isAdmin is undefined, setting to false');
          updateData.isAdmin = false;
        } else {
          console.log('SignIn - isAdmin already exists with value:', existingUser.isAdmin);
        }

        if (Object.keys(updateData).length > 0) {
          console.log('SignIn - Updating user with data:', updateData);
          await usersCollection.updateOne(
            { _id: objUserId },
            { $set: updateData }
          );
          console.log('✅ SignIn - User fields updated successfully');
        } else {
          console.log('SignIn - No updates needed');
        }
      } else {
        console.log('SignIn - No existing user found');
      }
      
      console.log('🟡 SIGNIN EVENT END\n');
    },
  },

  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };