export const Profile = {
  user: async (parent: any, _args: any, { prisma }: any) => {
    return await prisma.user.findUnique({
      where: {
        id: parent.userId,
      },
    });
  },
};
