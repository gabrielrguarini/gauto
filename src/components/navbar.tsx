import { BarChart3, Box, FileBox, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex flex-col min-w-48 h-screen shadow-lg justify-between">
      <div>
        <h3 className="p-2 text-xl font-semibold">Gauto</h3>
        <div className="h-[1px] w-11/12 bg-slate-300 mx-auto"></div>

        <ul className="flex flex-col space-y-2 p-2 font-semibold">
          <li className="rounded-lg p-2 hover:bg-slate-300">
            <Link className="flex gap-4" href="/">
              <BarChart3 />
              <p>Dashboard</p>
            </Link>
          </li>
          <li className="rounded-lg p-2 hover:bg-slate-300">
            <Link className="flex gap-4" href="/produtos">
              <Box />
              Produtos
            </Link>
          </li>
          <li className="rounded-lg p-2 hover:bg-slate-300">
            <Link className="flex gap-4" href="/clientes">
              <User />
              Clientes
            </Link>
          </li>
          <li className="rounded-lg p-2 hover:bg-slate-300">
            <Link className="flex gap-4" href="/notas">
              <FileBox />
              Notas
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex justify-self-end p-4 gap-4">
        <Image
          className="rounded-full border-solid border-2 border-slate-300"
          width={40}
          height={40}
          src="https://randomuser.me/api/portraits/lego/7.jpg"
          alt="Foto"
        />
        <div className="h-9 leading-none">
          <p className="text-sm font-semibold">Fulano de Tal</p>
          <span className="text-xs text-slate-400">Administrador</span>
        </div>
      </div>
    </nav>
  );
}
