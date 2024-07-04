"use client";
import { useFormState } from "react-dom";
import ExcluiClienteId from "@/app/actions/excluiClienteId";
import { Trash2Icon } from "lucide-react";
import SubmitButton from "@/components/ui/submitButton";
import { memo } from "react";
function ExcluiClienteButton({
  id,
  className,
  ...props
}: {
  id: number;
  className?: string;
}) {
  const initialState = { errors: "" };
  const [state, formAction] = useFormState(
    () => ExcluiClienteId(id),
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
export default memo(ExcluiClienteButton);
