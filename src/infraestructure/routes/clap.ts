import * as Router from "koa-router";
import { ClapController } from "../controller/ClapController";

const router = new Router({ prefix: "/clap" });
const clapController: ClapController = new ClapController();

router.post("/", clapController.createClap.bind(clapController));

export default router;
