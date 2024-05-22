import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import config from "../config";
import { jwtHelper } from "../utils/jwtHelper";

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
      const isExist = await prisma.user.findFirst({
        where: {
          email: args.email,
        },
      });

      if (isExist) {
        return {
          userError: "User already exists",
          token: null,
        };
      }

      const hashedPassword = await bcrypt.hash(args.password, 12);

      const newUser = await prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
          password: hashedPassword,
        },
      });

      if (args.bio) {
        await prisma.profile.create({
          data: {
            userId: newUser.id,
            bio: args.bio,
          },
        });
      }

      const token = await jwtHelper.generateToken(
        { userId: newUser.id },
        config.jwt.secret as string
      );

      return {
        userError: null,
        token: token,
      };
    },

    signin: async (parent: any, args: any, context: any) => {
      const user = await prisma.user.findFirst({
        where: {
          email: args.email,
        },
      });

      if (!user) {
        return {
          userError: "User not found",
          token: null,
        };
      }

      const correctPassword = await bcrypt.compare(
        args.password,
        user?.password
      );

      if (!correctPassword) {
        return {
          userError: "invalid credentials",
          token: null,
        };
      }

      const token = await jwtHelper.generateToken(
        { userId: user.id },
        config.jwt.secret as string
      );

      return {
        userError: null,
        token,
      };
    },
  },
};
