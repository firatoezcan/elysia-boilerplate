import Elysia, { InputSchema, t } from "elysia";

import { setup } from "../plugins/setup";
import { BasicContext } from "../elysia-utils";

const names: string[] = [];

// How to move out functions using context
const getAllNames = (ctx: BasicContext) => {
  ctx.db("Getting all names from database");
  return names;
};

const getNameConfig = {
  response: t.String(),
  params: t.Object({
    name: t.String(),
  }),
} satisfies InputSchema;

// How to move out functions using context with a config
const getName = (ctx: BasicContext<typeof getNameConfig>) => {
  const { params } = ctx;
  const { name } = params;
  if (!names.includes(name)) {
    ctx.db("Adding name to database");
    names.push(name);
  }
  return `Hello ${name}`;
};

export default new Elysia({ name: "hello" }).use(setup).group("/hello", (app) =>
  app
    .get(
      "",
      (ctx) => {
        return getAllNames(ctx);
      },
      {
        response: t.Array(t.String()),
      }
    )
    .get(
      "/:name",
      async (ctx) => {
        return getName(ctx);
      },
      {
        response: t.String(),
      }
    )
    .get(
      "/failtest/:id",
      async (ctx) => {
        // This fails since Elysia knows that params doesnt have name
        // @ts-expect-error
        return getName(ctx);
      },
      {
        response: t.String(),
      }
    )
    .post(
      "",
      async (ctx) => {
        return ctx.body;
      },
      {
        response: t.Object({
          name: t.String(),
          description: t.Optional(t.String()),
        }),
        body: t.Object({
          name: t.String(),
          description: t.Optional(t.String()),
        }),
      }
    )
);
