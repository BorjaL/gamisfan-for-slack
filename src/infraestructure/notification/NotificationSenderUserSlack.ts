import { WebClient } from "@slack/web-api";
import { config } from "../../config";
import { INotificationSender } from "../../domain/INotificationSender";
import { Message } from "../../domain/valueObjects/Message";
import { User } from "../../domain/valueObjects/User";

export class NotificationSenderUserSlack implements INotificationSender {
    private web: WebClient;
    private receiver: User;

    constructor(receiver: User) {
        this.receiver = receiver;
        this.web = new WebClient(config.slack.oAuthAccessToken);
    }

    public send(message: Message): void {
        this.web.chat.postMessage({
            channel: this.receiver.getId(),
            text: `Someone just clapped you with the following message:\n\n ${message.getValue()} \n\n\nYou should be proud of yourself :blush: We all are.`,
        });
    }
}
