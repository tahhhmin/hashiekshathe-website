// src/lib/auth.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function getServerAuthSession() {
  return await getServerSession(authOptions());
}

export async function requireAuth() {
  const session = await getServerAuthSession();
  if (!session) {
    throw new Error("Authentication required");
  }
  return session;
}

export async function requireAdmin() {
  const session = await requireAuth();
  if (!session.user.isAdmin) {
    throw new Error("Admin access required");
  }
  return session;
}