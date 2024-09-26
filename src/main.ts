import { Elysia } from "elysia";
import { setup } from "./plugins/setup";
import { routes } from "./routes";
import swagger from "@elysiajs/swagger";

const app = new Elysia()
  .use(
    swagger({
      path: "/swagger",
      autoDarkMode: true,
      documentation: {
        info: {
          title: "Application Title",
          version: "0.0.1",
        },
        servers: [
          {
            url: "http://localhost:3000",
            description: "Localhost",
          },
        ],
      },
    })
  )
  .onError((ctx) => {
    console.error(ctx.error.stack);
  })
  .use(setup)
  .use(routes)
  .listen(3000, (server) => {
    console.info(`Server listening on ${server.url}`);
    console.info(`Swagger UI available at ${server.url}/swagger`);
  });

export type ElysiaApp = typeof app;
