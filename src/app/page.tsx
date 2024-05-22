import { auth, signIn, signOut } from "@/auth";
import SingOutButton from "@/components/ui/singInButton";
export default async function Dashboard() {
  const sessao = await auth();
  if (!sessao) {
    return (
      <div>
        <div>Usuário não autenticado</div>
          <button
            className="border-solid border-2 border-slate-600 py-1 px-4 rounded-md"
          >
            Entrar
          </button>
      </div>
    );
  }
  return (
    <div>
      <div>Usuário autenticado</div>
      <SingOutButton />
    </div>
  );
}
