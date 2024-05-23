export const Post = {
  author: async (parent: any, _args: any, { prisma }: any) => {
    return await prisma.user.findUnique({
      where: {
        id: parent.authorId,
      },
    });
  },
};
