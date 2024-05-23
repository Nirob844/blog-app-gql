export const Query = {
  me: async (_parent: any, _agrs: any, { prisma, userInfo }: any) => {
    return await prisma.user.findUnique({
      where: {
        id: userInfo.userId,
      },
    });
  },
  profile: async (_parent: any, args: any, { prisma }: any) => {
    return await prisma.profile.findUnique({
      where: {
        userId: Number(args.userId),
      },
    });
  },
  users: async (_parent: any, _args: any, { prisma }: any) => {
    return await prisma.user.findMany();
  },
  posts: async (_parent: any, _args: any, { prisma }: any) => {
    return await prisma.post.findMany({
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
      // include: {
      //   author: true,
      // },
    });
  },
};
