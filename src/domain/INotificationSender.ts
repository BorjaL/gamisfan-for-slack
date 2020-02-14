import { Message } from "./valueObjects/Message";
import { User } from "./valueObjects/User";

export interface INotificationSender {
    send(receiver: User, message: Message): void;
}
