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
import SubmitButton from "./ui/submitButton";
import { useCallback, useEffect, useState } from "react";
import buscaClienteId from "@/app/actions/buscaClienteId";
import { Cliente } from "@prisma/client";
import InputPersonalizado from "./ui/inputPersonalizado";
import EditaCliente from "@/app/actions/editaCliente";
import { useFormState } from "react-dom";
import { set } from "zod";

export default function EditaClienteDialog({ id }: { id: number }) {
  const [cliente, setCliente] = useState<Cliente>({
    id: 0,
    nome: "",
    endereco: "",
    cidade: "",
    telefone: "",
    dataDeCriacao: new Date(),
    dataDeAtualizacao: new Date(),
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const fetchCliente = useCallback(async () => {
    const clienteAwait = await buscaClienteId(id);
    if (clienteAwait) {
      setCliente(clienteAwait);
      setIsLoading(false);
    }
  }, [id]);
  useEffect(() => {
    if (isDialogOpen) {
      setIsLoading(true);
      fetchCliente();
    }
  }, [isDialogOpen, fetchCliente]);
  const initialState = { errors: "", message: undefined };
  const [state, formAction] = useFormState(
    (state: any, formData: FormData) => EditaCliente(formData, cliente.id),
    initialState
  );
  return (
    <>
      <Dialog onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="text px-1 py-0 h-6">
            <SquarePen height={12} width={12} />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {isLoading ? "Carregando..." : "Editar Cliente"}
            </DialogTitle>
            <DialogDescription>
              {isLoading
                ? "Aguarde, carregando os dados do cliente."
                : "Modifique para editar os dados do cliente."}
            </DialogDescription>
          </DialogHeader>
          <form action={formAction} className="flex flex-col mt-4 gap-2">
            <Input
              placeholder={isLoading ? "Carregando..." : "Nome"}
              name="nome"
              value={cliente.nome}
              onChange={(e) => setCliente({ ...cliente, nome: e.target.value })}
            />
            <Input
              placeholder={isLoading ? "Carregando..." : "Cidade"}
              name="cidade"
              value={cliente.cidade}
              onChange={(e) =>
                setCliente({ ...cliente, cidade: e.target.value })
              }
            />
            <Input
              placeholder={isLoading ? "Carregando..." : "Endereço"}
              name="endereco"
              value={cliente.endereco ? cliente.endereco : ""}
              onChange={(e) =>
                setCliente({ ...cliente, endereco: e.target.value })
              }
            />
            <InputPersonalizado
              placeholder={isLoading ? "Carregando..." : "Telefone"}
              name="telefone"
              value={cliente?.telefone ? cliente.telefone : ""}
              onValueChange={(values) =>
                setCliente(
                  values.value
                    ? { ...cliente, telefone: values.value }
                    : { ...cliente, telefone: "" }
                )
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
