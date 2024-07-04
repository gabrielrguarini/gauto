"use client";
import { useFormState } from "react-dom";
import { Trash2Icon } from "lucide-react";
import ExcluiProdutoId from "@/app/actions/excluiProdutoId";
import SubmitButton from "@/components/ui/submitButton";
import { memo } from "react";
function ExcluiProdutoButton({
  id,
  className,
  ...props
}: {
  id: number;
  className?: string;
}) {
  const initialState = { errors: "" };
  const [state, formAction] = useFormState(
    () => ExcluiProdutoId(id),
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
export default memo(ExcluiProdutoButton);
