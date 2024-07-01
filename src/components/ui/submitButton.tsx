"use client";
import { Button } from "./button";
import { useFormStatus } from "react-dom";

export default function SubmitButton<HTMLButtonElement>({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <Button {...props} className={className} type="submit" disabled={pending}>
      {children}
    </Button>
  );
}
