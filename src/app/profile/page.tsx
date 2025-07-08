import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const { name, email, image } = session.user || {};

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Profile Page</h1>

      {image && (
        <Image
          src={image}
          alt="User Image"
          width={80}
          height={80}
          className="rounded-full"
        />
      )}

      <p className="mt-2 text-lg">Name: {name}</p>
      <p className="text-lg">Email: {email}</p>
    </main>
  );
}
