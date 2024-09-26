import cors from "@elysiajs/cors";
import { Elysia } from "elysia";

export const setup = new Elysia({
  name: "setup",
})

  .decorate("db", (...args: any[]) => {
    console.log(args);
  })
  .use(
    cors({
      origin:
        process.env.NODE_ENV === "production"
          ? ["google.com", "*.google.com"]
          : ["*"],
    })
  )
  .onRequest(async (ctx) => {
    ctx.db("Sending query to database");
    console.log(ctx.request.url);
  });
