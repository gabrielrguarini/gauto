import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
const bcrypt = require("bcryptjs");

import prisma from "./lib/prisma";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        senha: {},
      },
      authorize: async (credentials) => {
        try {
          const usuario = await prisma.user.findUnique({
            where: {
              email: credentials.email as string,
            },
            select: {
              email: true,
              senha: true,
            },
          });
          if (!usuario) {
            console.log("Usuário não encontrado");
            return null;
          }
          const match = await bcrypt.compare(credentials.senha, usuario.senha);
          console.log(match);
          if (!match) {
            console.log("Senha incorreta");
            return null;
          }
          console.log("Usuário autenticado com sucesso");
          return usuario;
        } catch (erro) {
          console.log(erro);
          return null;
        }
      },
    }),
  ],
});
