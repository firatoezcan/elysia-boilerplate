import Elysia from "elysia";
import { setup } from "../plugins/setup";
import hello from "./hello";

const base = new Elysia({ name: "routes" }).use(setup);
export type RouteApp = typeof base;

export const routes = base.use(hello);
