"use server";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogaUsuario } from "../../actions/logaUsuario";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await auth();
  if (session) {
    redirect("/");
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-4 w-96 border-4 shadow-xl">
        <p className="text-center">Insira seus dados</p>
        <form action={LogaUsuario} className="flex flex-col mt-4 gap-2">
          <Input
            className=""
            type="text"
            placeholder="Digite seu nome"
            id="emailId"
            name="email"
          />
          <Input
            className=""
            type="password"
            placeholder="Digite sua senha"
            id="senhaId"
            name="senha"
          />
          <Button type="submit">Entrar</Button>
        </form>
      </div>
    </div>
  );
}
