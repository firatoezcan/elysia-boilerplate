import { InferContext, InputSchema, Static, t, TSchema } from "elysia";
import { RouteApp } from "./routes";

type TObject = ReturnType<typeof t.Object>;

type CreateCtxConfig<Config extends InputSchema | undefined> =
  Config extends undefined
    ? NonNullable<unknown>
    : {
        [P in keyof Config]-?: undefined extends Config[P]
          ? undefined
          : Config[P] extends TObject
          ? Static<Config[P]>
          : Config[P] extends TSchema
          ? Static<Config[P]>
          : Config[P];
      };

export type BasicContext<Config extends InputSchema | undefined = undefined> =
  Pick<InferContext<RouteApp>, "db" | "set"> &
    Omit<CreateCtxConfig<Config>, "response">;
