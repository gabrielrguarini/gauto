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
import criaCliente from "@/app/actions/criaCliente";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";
import SubmitButton from "./ui/submitButton";

const initialState = {
  message: "",
};

export default function CriarClienteDialog() {
  const [state, formAction] = useFormState(criaCliente, initialState);

  if (state?.errors) {
    toast.error(state.errors, {
      closeButton: true,
    });
  }
  if (state?.message) {
    toast(state.message, {
      closeButton: true,
      className: "justify-center w-64",
    });
  }

  return (
    <div className="relative">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Criar cliente</Button>
        </DialogTrigger>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Criar cliente</DialogTitle>
            <DialogDescription>
              Preencha os dados para criar um novo cliente.
            </DialogDescription>
          </DialogHeader>
          <form action={formAction} className="flex flex-col mt-4 gap-2">
            <Input placeholder="Nome*" name="nome" />
            <Input placeholder="Cidade*" name="cidade" />
            <Input placeholder="Endereço" name="endereco" />
            <Input placeholder="Telefone" name="telefone" />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant={"outline"} type="button">
                  Cancelar
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
