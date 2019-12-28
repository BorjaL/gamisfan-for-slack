import { CreateClapAction } from "../../actions/CreateClapAction";
import { IClapRepository } from "../../domain/IClapRepository";
import { INotificationSender } from "../../domain/INotificationSender";
import { Message } from "../../domain/valueObjects/Message";
import { Team } from "../../domain/valueObjects/Team";
import { User } from "../../domain/valueObjects/User";
import { logger } from "../../logger";
import { ClapRepositoryFirebase } from "../db/ClapRepositoryFirebase";
import { NotificationSenderUserSlack } from "../notification/NotificationSenderUserSlack";
import { ClapMessageParser } from "../services/ClapMessageParser";
import { IClapCreationParams } from "./IClapCreationParams";
import { MessageParsed } from "./MessageParsed";

export class ClapController {
    public async createClap(ctx: any, next: any) {
        const data: IClapCreationParams = ctx.request.body;

        try {
            const messageParsed: MessageParsed = await ClapMessageParser.parse(data.text);

            const team: Team = new Team(data.team_id, data.team_domain);
            const clapper: User = new User(data.user_id, data.user_name);
            const clapReceiver: User = messageParsed.getUser();
            const message: Message = messageParsed.getMessage();

            const clapRepository: IClapRepository = new ClapRepositoryFirebase();
            const notificationSender: INotificationSender = new NotificationSenderUserSlack(clapReceiver);
            const createClapAction: CreateClapAction = new CreateClapAction(clapRepository, notificationSender);

            const createdOk = await createClapAction.create(team, clapper, clapReceiver, message);

            if (createdOk) {
                ctx.status = 200;
                ctx.body = {
                    response_type: "ephemeral",
                    text: "You are a nice teammate :wink:",
                };
            } else {
                ctx.status = 200;
                ctx.body = {
                    response_type: "ephemeral",
                    text: "We couldn't clap your mate. Someone is working right away to fix it :)",
                };
            }
        } catch (err) {
            logger.error("Error creating the clap with the following error: ", err);
            ctx.status = 200;
            ctx.body = {
                response_type: "in_channel",
                text: "Please, make sure that you select a user with @",
            };
        }

        return next();
    }
}
