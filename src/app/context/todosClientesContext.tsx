"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { BuscaClientes } from "@/app/actions/buscaClientes";

interface ClienteContextProps {
  clientes: ClienteProps[];
  isLoading: boolean;
  error: Error | null;
}

interface ClienteProps {
  id: number;
  nome: string;
  endereco: string | null;
  cidade: string;
  telefone: string | null;
  dataDeCriacao: Date;
  dataDeAtualizacao: Date;
}

const ClientesContext = createContext<ClienteContextProps | undefined>(
  undefined
);

// Custom hook para usar o contexto
export const useClientes = () => {
  const context = useContext(ClientesContext);
  if (context === undefined) {
    throw new Error("Erro no context de clientes");
  }
  return context;
};

export const ClientesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [clientes, setClientes] = useState<ClienteProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const clientesData = await BuscaClientes();
        setClientes(clientesData);
      } catch (error) {
        setError(new Error("Erro ao buscar clientes no context"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchClientes();
  }, []);

  return (
    <ClientesContext.Provider value={{ clientes, isLoading, error }}>
      {children}
    </ClientesContext.Provider>
  );
};
