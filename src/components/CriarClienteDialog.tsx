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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import criaCliente from "@/app/actions/criaCliente";
import SubmitButton from "./ui/submitButton";
import { useFormState } from "react-dom";

const initialState = {
  message: "",
};
export default function CriarClienteDialog() {
  const [state, formAction] = useFormState(criaCliente, initialState);
  return (
    <div>
      {state?.message && (
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Mensagem</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}
      {state?.errors && (
        <Alert variant={"destructive"}>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Mensagem</AlertTitle>
          <AlertDescription>{state.errors}</AlertDescription>
        </Alert>
      )}

      <Dialog>
        <DialogTrigger asChild>
          <Button>Criar cliente</Button>
        </DialogTrigger>
        <DialogContent>
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
