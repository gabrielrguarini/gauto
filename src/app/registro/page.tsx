import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CriaUsuario } from "@/app/actions/criaUsuario";

export default function Registro() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-4 w-96 border-4 shadow-xl">
        <p className="text-center">Insira seus dados</p>
        <form action={CriaUsuario} className="flex flex-col mt-4 gap-2">
          <Input
            className=""
            type="email"
            placeholder="Digite seu email"
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
          <Input
            className=""
            type="password"
            placeholder="Digite sua senha novamente"
            id="senha2Id"
            name="senha2"
          />
          <Button type="submit">Criar usuário</Button>
        </form>
      </div>
    </div>
  );
}
