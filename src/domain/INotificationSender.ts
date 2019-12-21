import { Message } from "./valueObjects/Message";

export interface INotificationSender {
    send(message: Message): void;
}
