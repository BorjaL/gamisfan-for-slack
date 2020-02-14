import * as Router from "koa-router";
import { ClapController } from "../controller/ClapController";
import { slackMiddleware } from "./middleware/slackMiddleware";
import { ClapRepositoryFirebase } from "../db/ClapRepositoryFirebase";
import { NotificationSenderUserSlack } from "../notification/NotificationSenderUserSlack";

const router = new Router({ prefix: "/clap" });

const clapRepository = new ClapRepositoryFirebase();
const notificationSender = new NotificationSenderUserSlack();
const clapController: ClapController = new ClapController(clapRepository, notificationSender);

router.post("/", slackMiddleware.verificate, clapController.createClap.bind(clapController));

export default router;
