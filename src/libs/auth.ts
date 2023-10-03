import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/libs/prisma";
import { compare } from "bcrypt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
export const AuthOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  pages: {
    signIn: "/iniciar-sesion",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        user: {
          label: "Username or email",
          type: "text",
          placeholder: "username, email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.user && !credentials?.password) return null;

        const existingUser = await db.users.findFirst({
          where: {
            OR: [
              {
                email: credentials.user,
              },
              {
                username: credentials.user,
              },
            ],
          },
        });

        if (!existingUser) {
          throw new Error("Usuario incorrecto") ;
        }

        const isPasswordValid = await compare(
          credentials.password,
          existingUser.password
        );

        if (!isPasswordValid) {
          throw new Error("Contraseña incorrecta") ;
        }

        return {
          id: existingUser.id + "",
          name: existingUser.username,
          email: existingUser.email,
        };
      },
    }),
  ],
 

};
