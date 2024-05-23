import { Mutation } from "./Mutation/Mutation";
import { Query } from "./Query/Query";
import { Post } from "./post";
import { Profile } from "./profile";
import { User } from "./user";

export const resolvers = {
  Query,
  User,
  Profile,
  Post,
  Mutation,
};
