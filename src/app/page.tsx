"use server";
import { auth } from "@/auth";
import SingOutButton from "@/components/ui/singInButton";
import { redirect } from "next/navigation";
export default async function Dashboard() {
  const sessao = await auth();
  if (!sessao) {
    redirect("/login");
  }
  return (
    <div>
      <div>Usuário autenticado</div>
      <SingOutButton />
    </div>
  );
}
