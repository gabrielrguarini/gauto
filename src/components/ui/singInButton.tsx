import { signOut } from "@/auth";
import { Button } from "./button";

export default function SingOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/login" });
      }}
    >
      <Button type="submit">Sair</Button>
    </form>
  );
}
