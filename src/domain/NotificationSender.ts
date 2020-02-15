import { Message } from "./valueObjects/Message";
import { User } from "./valueObjects/User";

export interface NotificationSender {
    send(receiver: User, message: Message): void;
}
