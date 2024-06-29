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
import ListaProdutos from "./ui/listaProdutos";
import { useEffect, useState } from "react";
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
import buscaNotaId, { BuscaNotaIdType } from "@/app/actions/buscaNotaId";
import { EditaNota } from "@/app/actions/editaNota";

export default function EditarNotaDialog({ id }: { id: number }) {
  const [todosClientes, setTodosClientes] = useState<Cliente[]>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dadosNota, setDadosNota] = useState<BuscaNotaIdType | null>();
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [dadosNotaFetch, clientes] = await Promise.all([
          buscaNotaId(id),
          BuscaClientes(),
        ]);
        setDadosNota(dadosNotaFetch);
        setTodosClientes(clientes);
        if (dadosNotaFetch) return setProdutos(dadosNotaFetch.produtos);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    if (isDialogOpen) {
      fetchData();
    }
  }, [isDialogOpen, id]);

  const initialState = {
    erros: "",
    message: "",
    produtos: [],
  };
  const [state, formAction] = useFormState(
    (state: any, formData: FormData) =>
      EditaNota(state, formData, produtos, id),
    initialState
  );

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
          <form action={formAction} className="flex flex-col mt-4 gap-2">
            <Input
              placeholder="Carregando nota*"
              name="numero"
              defaultValue={dadosNota?.numero}
              required
            />
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
