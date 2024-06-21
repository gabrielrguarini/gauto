import { auth } from "@/auth";
import Navbar from "@/components/navbar";
import { redirect } from "next/navigation";

export default async function PrivateLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const sessao = await auth();
  if (!sessao) {
    redirect("/login");
  }
  return (
    <main className="flex">
      <Navbar />
      {children}
    </main>
  );
}
