import * as Koa from "koa";
import * as bodyparser from "koa-bodyparser";
import * as json from "koa-json";
const koaRequestLogger = require("koa2-winston").logger;
import { logger } from "../logger";
import router from "./routes";

const server = new Koa();

server.use(koaRequestLogger({winstonInstance: logger}));
server.use(json());
server.use(bodyparser());

server.use(router());

export default server;
