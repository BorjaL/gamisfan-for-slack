import * as Router from "koa-router";
import { ClapController } from "../controller/ClapController";
import { ClapRepositoryFirebase } from "../db/ClapRepositoryFirebase";
import { NotificationSenderUserSlack } from "../notification/NotificationSenderUserSlack";
import { slackMiddleware } from "./middleware/slackMiddleware";

const router = new Router({ prefix: "/clap" });

const clapRepository = new ClapRepositoryFirebase();
const notificationSender = new NotificationSenderUserSlack();
const clapController: ClapController = new ClapController(clapRepository, notificationSender);

router.post("/", slackMiddleware.verificate, clapController.createClap.bind(clapController));

export default router;
