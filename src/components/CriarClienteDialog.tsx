"use client";
import { useState } from "react";
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
import { useFormState } from "react-dom";

const initialState = {
  message: "",
};

export default function CriarClienteDialog() {
  const [state, formAction] = useFormState(criaCliente, initialState);
  const [alertState, setAlertState] = useState(true);
  const handleClick = () => {
    if (state?.errors || state?.message) {
      setAlertState(true);
    }
    const timer = setTimeout(() => {
      setAlertState(false);
      state.message = undefined;
      state.errors = undefined;
    }, 3000);
    return () => clearTimeout(timer);
  };
  return (
    <div className="relative">
      {state?.message && alertState && (
        <Alert className="fixed bottom-4 left-4 max-w-xs">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Mensagem</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}
      {state?.errors && alertState && (
        <Alert
          className="fixed bottom-4 left-4 max-w-xs"
          variant={"destructive"}
        >
          <Terminal className="h-4 w-4" />
          <AlertTitle>Mensagem</AlertTitle>
          <AlertDescription>{state.errors}</AlertDescription>
        </Alert>
      )}

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
            <Input placeholder="Nome*" name="nome" required />
            <Input placeholder="Cidade*" name="cidade" required />
            <Input placeholder="Endereço" name="endereco" />
            <Input placeholder="Telefone" name="telefone" />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant={"outline"} type="button">
                  Cancelar
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="submit" onClick={handleClick}>
                  Salvar
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
