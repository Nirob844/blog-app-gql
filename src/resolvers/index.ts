import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

interface userInfo {
  name: string;
  email: string;
  password: string;
  bio?: string;
}

export const resolvers = {
  Query: {
    users: async (parent: any, args: any, context: any) => {
      return await prisma.user.findMany();
    },
  },
  Mutation: {
    signup: async (parent: any, args: userInfo, context: any) => {
      const hashedPassword = await bcrypt.hash(args.password, 12);

      const newUser = await prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
          password: hashedPassword,
        },
      });

      const token = jwt.sign({ userId: newUser.id }, "signature", {
        expiresIn: "1d",
      });

      return {
        token: token,
      };
    },
  },
};