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

import { CriaNota } from "@/app/actions/criaNota";
import ListaProdutos from "./ui/listaProdutos";
import { Suspense, useCallback, useEffect, useState } from "react";
import { BuscaClientes } from "@/app/actions/buscaClientes";
import BuscaNotaId from "@/app/actions/buscaNotaId";
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
import { Cliente, Produto } from "@prisma/client";
import buscaNotaId, { BuscaNotaIdType } from "@/app/actions/buscaNotaId";

export default function EditarNotaDialog({ id }: { id: number }) {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [todosClientes, setTodosClientes] = useState<Cliente[]>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dadosNota, setDadosNota] = useState<BuscaNotaIdType>();

  const fetchNota = useCallback(async () => {
    const notaAwait = await buscaNotaId(id);
    if (notaAwait) {
      setDadosNota(notaAwait);
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (isDialogOpen) {
      setIsLoading(true);
      fetchNota();
    }
  }, [fetchNota, isDialogOpen]);

  useEffect(() => {
    async function fetchClientes() {
      const todoClientes = await BuscaClientes();
      setTodosClientes(todoClientes);
    }
    async function fetchNota(id: number) {
      const nota = await BuscaNotaId(id);
      if (nota) setProdutos(nota.produtos);
    }
    fetchClientes();
    fetchNota(id);
  }, [id]);

  const initialState = {
    erros: "",
    message: "",
    produtos: [],
  };
  // const [state, formAction] = useFormState(
  //   (state: any, formData: FormData) => CriaNota(state, formData, produtos),
  //   initialState
  // );

  // useEffect(() => {
  //   if (state.errors) {
  //     toast.error(state.errors, {
  //       closeButton: true,
  //     });
  //   }
  //   if (state.message) {
  //     toast(state.message, {
  //       closeButton: true,
  //       className: "justify-center w-64",
  //     });
  //     setProdutos([]);
  //   }
  // }, [state]);
  if (!todosClientes) return <Button disabled>Carregando...</Button>;
  return (
    <div className="relative">
      <Dialog onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button>Editar Nota</Button>
        </DialogTrigger>
        <DialogContent className="w-full h-full content-start">
          <DialogHeader>
            <DialogTitle>Editar Nota</DialogTitle>
            <DialogDescription>
              Preencha os dados para editar uma nova nota.
            </DialogDescription>
          </DialogHeader>
          <form
            action={() => console.log("Edita Nota")}
            className="flex flex-col mt-4 gap-2"
          >
            <Input placeholder="Numero*" name="numero" required />
            <Select name="cliente">
              <SelectTrigger>
                <SelectValue placeholder="Cliente*" />
              </SelectTrigger>
              <SelectContent>
                {todosClientes?.map((cliente) => (
                  <SelectItem key={cliente.id} value={`${cliente.id}`}>
                    {cliente.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Suspense
              fallback={
                <ListaProdutos
                  produtos={dadosNota?.produtos}
                  setProdutos={setProdutos}
                />
              }
            ></Suspense>

            <DialogFooter className="self-end">
              <Button
                variant={"destructive"}
                type="button"
                onClick={() => setProdutos([])}
              >
                Limpar Produtos
              </Button>
              <DialogClose asChild>
                <Button
                  variant={"outline"}
                  type="button"
                  onClick={() => setProdutos([])}
                >
                  Sair
                </Button>
              </DialogClose>
              <SubmitButton>Salvar</SubmitButton>
              <DialogClose asChild></DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
