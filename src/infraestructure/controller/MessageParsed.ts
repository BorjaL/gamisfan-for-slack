import { Message } from "../../domain/valueObjects/Message";
import { User } from "../../domain/valueObjects/User";

export class MessageParsed {
    private clapReceiver: User;
    private message: Message;

    constructor(userId: string, userName: string, message: string) {
        this.clapReceiver = new User(userId, userName);
        this.message = new Message(message);
    }

    public getClapReceiver(): User {
        return this.clapReceiver;
    }

    public getMessage(): Message {
        return this.message;
    }
}
