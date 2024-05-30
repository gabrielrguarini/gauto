"use server";
import { auth } from "@/auth";
import SingOutButton from "@/components/ui/singInButton";
import { redirect } from "next/navigation";
import CriarClienteDialog from "@/components/CriarClienteDialog";
import CriarNotaDialog from "@/components/CriarNotaDialog";
export default async function Dashboard() {
  const sessao = await auth();
  if (!sessao) {
    redirect("/login");
  }
  return (
    <div>
      <CriarClienteDialog />
      <CriarNotaDialog />
      <SingOutButton />
    </div>
  );
}
