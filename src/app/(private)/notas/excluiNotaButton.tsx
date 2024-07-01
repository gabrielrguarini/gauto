"use client";
import { useFormState } from "react-dom";
import { Trash2Icon } from "lucide-react";
import SubmitButton from "@/components/ui/submitButton";
import ExcluiNotaId from "@/app/actions/excluiNotaId";
export default function ExcluiNotaButton({
  id,
  className,
  ...props
}: {
  id: number;
  className?: string;
}) {
  const initialState = { errors: "" };
  const [state, formAction] = useFormState(
    () => ExcluiNotaId(id),
    initialState
  );
  return (
    <form action={formAction}>
      <SubmitButton {...props} className={className}>
        <Trash2Icon height={12} width={12} />
      </SubmitButton>
    </form>
  );
}
