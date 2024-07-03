"use client";
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

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import SubmitButton from "./ui/submitButton";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { Produto } from "@prisma/client";
import { SquarePen } from "lucide-react";
import EditaProdutoId from "@/app/actions/editaProdutoId";
import InputPersonalizado from "./ui/inputPersonalizado";
import { useClientes } from "@/app/context/todosClientesContext";

interface ProdutoDialogProps extends Omit<Produto, "notaId"> {
  clienteId: number | null;
}
export default function EditaProdutoDialog({
  id,
  nome,
  quantidade,
  valorDeVenda,
  valorDeCompra,
  status,
  clienteId,
}: ProdutoDialogProps) {
  const initialState = {
    erros: "",
    message: "",
  };
  const [state, formAction] = useFormState(
    (state: any, formData: FormData) => EditaProdutoId(formData, id),
    initialState
  );
  const { clientes, isLoading, error } = useClientes();
  useEffect(() => {
    if (state.errors) {
      toast.error(state.errors, {
        closeButton: true,
        className: "justify-center w-64 bottom-0 right-0",
      });
    }
    if (state.message) {
      toast(state.message, {
        closeButton: true,
        className: "justify-center w-64 bottom-0 right-0",
      });
    }
  }, [state]);
  return (
    <div className="relative">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="text px-1 py-0 h-6">
            <SquarePen height={12} width={12} />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full h-full content-start">
          <DialogHeader>
            <DialogTitle>Editar Produto</DialogTitle>
            <DialogDescription>
              Preencha os dados para editar o produto.
            </DialogDescription>
          </DialogHeader>
          <form action={formAction} className="flex flex-col mt-4 gap-2">
            {isLoading ? (
              <Input placeholder="Carregando cliente*" />
            ) : (
              <Select name="clienteId" defaultValue={`${clienteId}`}>
                <SelectTrigger className="">
                  <SelectValue placeholder="Cliente*" />
                </SelectTrigger>
                <SelectContent>
                  {clientes.map((cliente) => (
                    <SelectItem key={cliente.id} value={`${cliente.id}`}>
                      {cliente.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            <Input
              placeholder="Carregando produto*"
              name="nome"
              defaultValue={nome}
              required
            />
            <Input
              placeholder="Carregando quantidade*"
              name="quantidade"
              defaultValue={quantidade}
              required
            />
            <InputPersonalizado
              name="valorDeVenda"
              moeda
              type="text"
              placeholder="Carregando valor de venda*"
              value={valorDeVenda}
              onValueChange={(values) => values.floatValue}
            />
            <InputPersonalizado
              name="valorDeCompra"
              moeda
              placeholder="Carregando valor de compra*"
              type="text"
              value={valorDeCompra}
              onValueChange={(values) => values.floatValue}
            />
            <Select name="status" defaultValue={status ?? "nenhum"}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nenhum">Nenhum</SelectItem>
                <SelectItem value="comprado">Comprado</SelectItem>
                <SelectItem value="cotado">Cotado</SelectItem>
                <SelectItem value="estoque">Em estoque</SelectItem>
                <SelectItem value="entregue">Entregue</SelectItem>
              </SelectContent>
            </Select>

            <DialogFooter className="self-end">
              <DialogClose asChild>
                <Button variant={"outline"} type="button">
                  Sair
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <SubmitButton>Salvar</SubmitButton>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
