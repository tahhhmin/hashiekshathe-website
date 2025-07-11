// src/app/api/auth/[...nextauth]/route.ts
// OPTIMIZED APPROACH: Using JWT sessions with efficient user data fetching

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  NEXTAUTH_SECRET,
} from "@/lib/env";
import clientPromise from "@/lib/mongoDB";
import { ObjectId } from "mongodb";

export const authOptions: NextAuthOptions = {
  // Remove adapter to use JWT sessions
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: NEXTAUTH_SECRET,
  
  // Use JWT strategy for better performance
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  callbacks: {
    // JWT callback - runs whenever JWT is created/accessed
    async jwt({ token, user, trigger }) {
      console.log('🟢 JWT CALLBACK START');
      console.log('JWT - Trigger:', trigger);
      console.log('JWT - Token:', JSON.stringify(token, null, 2));
      console.log('JWT - User:', JSON.stringify(user, null, 2));

      // On sign in, user object is available
      if (user) {
        console.log('JWT - First time sign in, fetching user data');
        const userData = await fetchUserData(user.email!);
        
        token.id = userData.id;
        token.email = userData.email;
        token.name = userData.name;
        token.image = userData.image;
        token.isAdmin = userData.isAdmin;
        token.createdAt = userData.createdAt;
        // Add any other custom fields here
        
        console.log('JWT - Updated token with user data:', JSON.stringify(token, null, 2));
      }

      // Optionally refresh user data periodically (e.g., every hour)
      // This prevents stale data but adds database calls
      const shouldRefresh = token.lastFetch && 
        Date.now() - (token.lastFetch as number) > 60 * 60 * 1000; // 1 hour
      
      if (shouldRefresh && token.email) {
        console.log('JWT - Refreshing user data due to age');
        try {
          const userData = await fetchUserData(token.email as string);
          token.isAdmin = userData.isAdmin;
          token.lastFetch = Date.now();
          // Update other fields as needed
        } catch (error) {
          console.error('JWT - Error refreshing user data:', error);
        }
      }

      if (!token.lastFetch) {
        token.lastFetch = Date.now();
      }

      console.log('🟢 JWT CALLBACK END\n');
      return token;
    },

    // Session callback - shapes the session object
    async session({ session, token }) {
      console.log('🟡 SESSION CALLBACK START');
      console.log('Session - Token:', JSON.stringify(token, null, 2));
      
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = token.image as string;
        session.user.isAdmin = token.isAdmin as boolean;
        session.user.createdAt = token.createdAt as Date;
        // Add any other custom fields here
      }

      console.log('Session - Final session:', JSON.stringify(session, null, 2));
      console.log('🟡 SESSION CALLBACK END\n');
      return session;
    },

    // SignIn callback - handle user creation/updates
    async signIn({ user, account, profile }) {
      console.log('🔵 SIGNIN CALLBACK START');
      console.log('SignIn - User:', JSON.stringify(user, null, 2));
      console.log('SignIn - Account:', JSON.stringify(account, null, 2));
      
      try {
        await upsertUser(user);
        console.log('✅ SignIn - User upserted successfully');
        return true;
      } catch (error) {
        console.error('❌ SignIn - Error upserting user:', error);
        return false;
      }
    },
  },

  pages: {
    signIn: "/login",
  },
};

// Helper function to fetch user data from database
async function fetchUserData(email: string) {
  console.log('📥 Fetching user data for email:', email);
  
  const client = await clientPromise;
  const db = client.db();
  const usersCollection = db.collection("users");
  
  let user = await usersCollection.findOne({ email });
  
  if (!user) {
    console.log('📥 User not found, this should not happen in normal flow');
    throw new Error('User not found');
  }
  
  console.log('📥 User data fetched:', JSON.stringify(user, null, 2));
  
  return {
    id: user._id.toString(),
    email: user.email,
    name: user.name,
    image: user.image,
    isAdmin: user.isAdmin ?? false,
    createdAt: user.createdAt,
    // Add any other custom fields here
  };
}

// Helper function to create or update user in database
async function upsertUser(user: any) {
  console.log('💾 Upserting user:', JSON.stringify(user, null, 2));
  
  const client = await clientPromise;
  const db = client.db();
  const usersCollection = db.collection("users");
  
  const existingUser = await usersCollection.findOne({ email: user.email });
  
  if (existingUser) {
    console.log('💾 User exists, updating...');
    const updateData: Record<string, any> = {};
    
    // Only update fields that might have changed
    if (existingUser.name !== user.name) updateData.name = user.name;
    if (existingUser.image !== user.image) updateData.image = user.image;
    
    // Ensure isAdmin field exists
    if (existingUser.isAdmin === undefined) {
      updateData.isAdmin = false;
    }
    
    if (Object.keys(updateData).length > 0) {
      updateData.updatedAt = new Date();
      
      await usersCollection.updateOne(
        { email: user.email },
        { $set: updateData }
      );
      console.log('✅ User updated with data:', updateData);
    }
  } else {
    console.log('💾 Creating new user...');
    const newUser = {
      name: user.name,
      email: user.email,
      image: user.image,
      isAdmin: false, // Default value
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    await usersCollection.insertOne(newUser);
    console.log('✅ New user created:', newUser);
  }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };