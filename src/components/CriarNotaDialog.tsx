import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { CriaNota } from "@/app/actions/criaNota";
import { BuscaClientes } from "@/app/actions/buscaClientes";
import ListaProdutos from "./ui/listaProdutos";

export default async function CriarClienteDialog() {
  const todosClientes = await BuscaClientes();
  return (
    <div className="relative">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Criar Nota</Button>
        </DialogTrigger>
        <DialogContent className="w-full h-full">
          <DialogHeader>
            <DialogTitle>Criar Nota</DialogTitle>
            <DialogDescription>
              Preencha os dados para criar uma nova nota.
            </DialogDescription>
          </DialogHeader>
          <form action={CriaNota} className="flex flex-col mt-4 gap-2">
            <Input placeholder="Numero*" name="numero" required />
            <Select>
              <SelectTrigger className="">
                <SelectValue placeholder="Cliente*" />
              </SelectTrigger>
              <SelectContent>
                {todosClientes.map((cliente) => (
                  <SelectItem key={cliente.id} value={`${cliente.id}`}>
                    {cliente.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <ListaProdutos />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant={"outline"} type="button">
                  Cancelar
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="submit">Salvar</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
