import * as Router from "koa-router";
import { ClapController } from "../controller/ClapController";
import { slackMiddleware } from "./middleware/slackMiddleware";

const router = new Router({ prefix: "/clap" });
const clapController: ClapController = new ClapController();

router.post("/", slackMiddleware.verificate, clapController.createClap.bind(clapController));

export default router;
