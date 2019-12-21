import * as combineRouters from "koa-combine-routers";
import clapRouter from "./clap";
import healthRouter from "./health";

export default combineRouters(
        healthRouter,
        clapRouter,
    );
