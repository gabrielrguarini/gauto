import buscaClienteId from "@/app/actions/buscaClienteId";
import EditaClienteDialog from "@/components/EditaClienteDialog";

export default async function NotaId({ params }: { params: { id: string } }) {
  try {
    const clienteIdNumber = Number(params.id);
    const cliente = await buscaClienteId(clienteIdNumber);
    if (!cliente) {
      return <div>Cliente não encontrado</div>;
    }
    return (
      <div>
        <EditaClienteDialog id={clienteIdNumber} />
      </div>
    );
  } catch (error) {
    throw new Error("Erro ao buscar cliente");
  }
}
