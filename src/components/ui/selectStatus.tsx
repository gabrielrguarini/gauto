import { Produto } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

interface ProdutoProps {
  dados: Produto;
  setDados: React.Dispatch<React.SetStateAction<Produto>>;
}
export default function SelectStatus({ dados, setDados }: ProdutoProps) {
  return (
    <Select
      value={dados.status ?? "nenhum"}
      onValueChange={(value) => setDados({ ...dados, status: value })}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="nenhum">Nenhum</SelectItem>
        <SelectItem value="comprado">Comprado</SelectItem>
        <SelectItem value="cotato">Cotato</SelectItem>
        <SelectItem value="estoque">Em estoque</SelectItem>
        <SelectItem value="entregue">Entregue</SelectItem>
      </SelectContent>
    </Select>
  );
}
