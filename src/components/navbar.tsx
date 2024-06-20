import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="min-w-48">
      <ul className="flex flex-col space-y-2 py-4">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/produtos">Produtos</Link>
        </li>
        <li>
          <Link href="/clientes">Clientes</Link>
        </li>
        <li>
          <Link href="/notas">Notas</Link>
        </li>
      </ul>
    </nav>
  );
}
