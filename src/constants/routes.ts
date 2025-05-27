import { defineRoutes } from "next-route";

export const routes = defineRoutes({
  home: "/",
  profile: "/profile",
  post: (id: string) => `/post/${id}`,
  setting: "/setting",
});
