import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoginUser } from "../actions/loginUser";
import { auth } from "@/auth";

export default async function SingIn() {
  const sessao = await auth();
  if (sessao) {
    return <div>Redirecionar</div>;
  }
  return (
    <div className="p-4 w-96 border-4 shadow-xl">
      <p className="text-center">Insira seus dados</p>
      <form action={LoginUser} className="flex flex-col mt-4 gap-2">
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
  );
}
