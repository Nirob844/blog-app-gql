import { PrismaClient } from "@prisma/client";
import { Mutation } from "./Mutation/Mutation";
import { Query } from "./Query/Query";

const prisma = new PrismaClient();

interface userInfo {
  name: string;
  email: string;
  password: string;
  bio?: string;
}

export const resolvers = {
  Query,
  Mutation,
};
