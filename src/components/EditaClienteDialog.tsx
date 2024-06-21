"use client";
import { SquarePen } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { InputTel } from "./ui/inputTel";
import SubmitButton from "./ui/submitButton";
import { useEffect, useState } from "react";
import buscaClienteId from "@/app/actions/buscaClienteId";
import { Cliente } from "@prisma/client";

export default function EditaClienteDialog({ id }: { id: number }) {
  const [cliente, setCliente] = useState<Cliente | null>(null);
  useEffect(() => {
    async function fetchCliente() {
      const clienteAwait = await buscaClienteId(1);
      setCliente(clienteAwait);
    }
    fetchCliente();
  }, []);
  if (cliente === null) return null;
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="px-2">
            <SquarePen size={20} />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Criar cliente</DialogTitle>
            <DialogDescription>
              Preencha os dados para criar um novo cliente.
            </DialogDescription>
          </DialogHeader>
          <form
            action={() => console.log("Edita Cliente Dialog")}
            className="flex flex-col mt-4 gap-2"
          >
            <Input
              placeholder="Nome*"
              name="nome"
              value={cliente?.nome}
              onChange={(e) => setCliente({ ...cliente, nome: e.target.value })}
            />
            <Input
              placeholder="Cidade*"
              name="cidade"
              value={cliente?.cidade}
              onChange={(e) =>
                setCliente({ ...cliente, cidade: e.target.value })
              }
            />
            <Input
              placeholder="Endereço"
              name="endereco"
              value={cliente?.endereco ? cliente.endereco : ""}
              onChange={(e) =>
                setCliente({ ...cliente, endereco: e.target.value })
              }
            />
            <InputTel
              placeholder="Telefone"
              name="telefone"
              value={cliente?.telefone ? cliente.telefone : ""}
              onChange={(e) =>
                setCliente({ ...cliente, telefone: e.target.value })
              }
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant={"outline"} type="button">
                  Cancelar
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <SubmitButton>Editar</SubmitButton>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}