import { CreateClapAction } from "../../actions/CreateClapAction";
import { ClapRepository } from "../../domain/ClapRepository";
import { NotificationSender } from "../../domain/NotificationSender";
import { Message } from "../../domain/valueObjects/Message";
import { Team } from "../../domain/valueObjects/Team";
import { User } from "../../domain/valueObjects/User";
import { logger } from "../../logger";
import { ClapMessageParser } from "../services/ClapMessageParser";
import { ClapCreationParams } from "./ClapCreationParams";
import { MessageParsed } from "./MessageParsed";
import SlackMessageBadFormatException from "./exceptions/SlackMessageBadFormatException";

export class ClapController {
    private clapRepository: ClapRepository;
    private notificationSender: NotificationSender;

    constructor(clapRepository: ClapRepository, notificationSender: NotificationSender) {
        this.clapRepository = clapRepository;
        this.notificationSender = notificationSender;
    }

    public async createClap(ctx: any, next: any) {
        const data: ClapCreationParams = ctx.request.body;

        try {
            const messageParsed: MessageParsed = await ClapMessageParser.parse(data.text);

            const team: Team = new Team(data.team_id, data.team_domain);
            const clapper: User = new User(data.user_id, data.user_name);
            const clapReceiver: User = messageParsed.getClapReceiver();
            const message: Message = messageParsed.getMessage();

            const createClapAction: CreateClapAction = new CreateClapAction(this.clapRepository,
                                                                            this.notificationSender);

            await createClapAction.create(team, clapper, clapReceiver, message);

            ctx.status = 200;
            ctx.body = {
                response_type: "ephemeral",
                text: "You are a nice teammate :wink:",
            };
        } catch (err) {
            if (err instanceof SlackMessageBadFormatException) {
                ctx.status = 200;
                ctx.body = {
                    response_type: "in_channel",
                    text: "Please, make sure that you select a user with @",
                };
            }
            else {
                ctx.status = 500;
                ctx.body = {
                    response_type: "in_channel",
                    text: "Ops, something unexpected went wrong, please try again",
                };
            }
            logger.error("Error creating the clap with the following error: ", err);
        }

        return next();
    }
}
