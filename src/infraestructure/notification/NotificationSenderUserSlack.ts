import { WebClient } from "@slack/web-api";
import { config } from "../../config";
import { NotificationSender } from "../../domain/NotificationSender";
import { Message } from "../../domain/valueObjects/Message";
import { User } from "../../domain/valueObjects/User";

export class NotificationSenderUserSlack implements NotificationSender {
    private web: WebClient;

    constructor() {
        this.web = new WebClient(config.slack.oAuthAccessToken);
    }

    public send(receiver: User, message: Message): void {
        this.web.chat.postMessage({
            channel: receiver.getId(),
            text: `Someone just clapped you with the following message:\n\n ${message.getValue()} \n\n\nYou should be proud of yourself :blush: We all are.`,
        });
    }
}
