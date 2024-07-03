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
import { useEffect, useState } from "react";

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

type ProdutoDialogProps = Omit<Produto, "notaId">;
export default function EditaProdutoDialog({
  id,
  nome,
  quantidade,
  valorDeVenda,
  valorDeCompra,
  status,
}: ProdutoDialogProps) {
  const initialState = {
    erros: "",
    message: "",
  };
  const [state, formAction] = useFormState(
    (state: any, formData: FormData) => EditaProdutoId(formData, id),
    initialState
  );

  useEffect(() => {
    if (state.message) {
      toast.error(state.errors, {
        closeButton: true,
      });
    }
    if (state.message) {
      toast(state.message, {
        closeButton: true,
        className: "justify-center w-64",
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
            <Input
              placeholder="Carregando valor de venda*"
              name="valorDeVenda"
              defaultValue={valorDeVenda}
              required
            />
            <Input
              placeholder="Carregando valor de compra*"
              name="valorDeCompra"
              defaultValue={valorDeCompra}
              required
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
