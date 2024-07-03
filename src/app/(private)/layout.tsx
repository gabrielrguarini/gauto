import { auth } from "@/auth";
import Navbar from "@/components/navbar";
import { redirect } from "next/navigation";
import Clientes from "./clientes/page";
import { ClientesProvider } from "../context/todosClientesContext";
export default async function PrivateLayout({
  children,
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
      <ClientesProvider>{children}</ClientesProvider>
    </main>
  );
}
