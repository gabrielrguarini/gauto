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
import { useEffect, useState } from "react";
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

export default function EditarNotaDialog({ id }: { id: number }) {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [todosClientes, setTodosClientes] = useState<Cliente[]>();

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
      <Dialog modal>
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
            <ListaProdutos produtos={produtos} setProdutos={setProdutos} />
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
