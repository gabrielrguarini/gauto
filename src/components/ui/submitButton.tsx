"use client";
import { Button } from "./button";
import { useFormStatus } from "react-dom";

export default function SubmitButton({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  const { pending } = useFormStatus();
  return (
    <Button {...props} type="submit" disabled={pending}>
      {children}
    </Button>
  );
}
