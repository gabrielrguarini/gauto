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
import { memo, useEffect, useRef, useState } from "react";
import { BuscaClientes } from "@/app/actions/buscaClientes";
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
import actionFile from "@/app/testes/actionFile";

export interface todosClientesInterface {
  id: number;
  nome: string;
  endereco?: string | null;
  cidade: string;
  telefone?: string | null;
  dataDeCriacao?: Date;
  dataDeAtualizacao?: Date;
}

function CriarNotaDialog() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [todosClientes, setTodosClientes] = useState<Cliente[]>();

  useEffect(() => {
    async function fetchClientes() {
      const todoClientes = await BuscaClientes();
      setTodosClientes(todoClientes);
    }
    fetchClientes();
  }, []);
  const initialState = {
    erros: "",
    message: "",
    produtos: [],
  };
  const [state, formAction] = useFormState(
    (state: any, formData: FormData) => actionFile(state, formData, produtos),
    initialState
  );

  useEffect(() => {
    if (state.errors) {
      toast.error(state.errors, {
        closeButton: true,
      });
    }
    if (state.message) {
      toast(state.message, {
        closeButton: true,
        className: "justify-center w-64",
      });
      setProdutos([]);
    }
  }, [state]);
  if (!todosClientes) return <Button disabled>Carregando...</Button>;
  return (
    <div className="relative">
      <Dialog modal>
        <DialogTrigger asChild>
          <Button>Criar Nota</Button>
        </DialogTrigger>
        <DialogContent className="w-full h-full content-start">
          <DialogHeader>
            <DialogTitle>Criar Nota</DialogTitle>
            <DialogDescription>
              Preencha os dados para criar uma nova nota.
            </DialogDescription>
          </DialogHeader>
          <form
            action={formAction}
            className="flex flex-col mt-4 gap-2"
            encType="multipart/form-data"
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
            <Input
              className="border-2 border-slate-600"
              type="file"
              name="arquivo"
              multiple
            />
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
export default memo(CriarNotaDialog);
