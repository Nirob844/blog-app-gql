import { checkUserAccess } from "../../checkUserAccess";

export const postResolvers = {
  addPost: async (_parent: any, { post }: any, { prisma, userInfo }: any) => {
    if (!userInfo) {
      return {
        userError: "Unauthorized",
        post: null,
      };
    }

    if (!post.title || !post.content) {
      return {
        userError: "Title and content is required!",
        post: null,
      };
    }

    const newPost = await prisma.post.create({
      data: {
        title: post.title,
        content: post.content,
        authorId: userInfo.userId,
      },
    });

    return {
      userError: null,
      post: newPost,
    };
  },

  updatePost: async (_parent: any, args: any, { prisma, userInfo }: any) => {
    if (!userInfo) {
      return {
        userError: "Unauthorized",
        post: null,
      };
    }

    const error = await checkUserAccess(prisma, userInfo.userId, args.postId);
    if (error) {
      return error;
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: Number(args.postId),
      },
      data: args.post,
    });

    return {
      userError: null,
      post: updatedPost,
    };
  },
  deletePost: async (_parent: any, args: any, { prisma, userInfo }: any) => {
    console.log(args);
    if (!userInfo) {
      return {
        userError: "Unauthorized",
        post: null,
      };
    }

    const error = await checkUserAccess(prisma, userInfo.userId, args.postId);
    if (error) {
      return error;
    }

    const deletedPost = await prisma.post.delete({
      where: {
        id: Number(args.postId),
      },
    });

    return {
      userError: null,
      post: deletedPost,
    };
  },

  publishPost: async (_parent: any, args: any, { prisma, userInfo }: any) => {
    console.log(args);
    if (!userInfo) {
      return {
        userError: "Unauthorized",
        post: null,
      };
    }

    const error = await checkUserAccess(prisma, userInfo.userId, args.postId);
    if (error) {
      return error;
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: Number(args.postId),
      },
      data: {
        published: true,
      },
    });

    return {
      userError: null,
      post: updatedPost,
    };
  },
};
