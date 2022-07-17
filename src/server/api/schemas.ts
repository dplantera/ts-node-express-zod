import zod from "zod";

export const schemaUsersPost = zod.object({
  name: zod.string(),
  email: zod.string().email()
});

export const schemaUsersPostResponse = zod.object({
  id: zod.string(),
});

export type User = zod.TypeOf<typeof schemaUsersPost>
export type UserResult = zod.TypeOf<typeof schemaUsersPostResponse>