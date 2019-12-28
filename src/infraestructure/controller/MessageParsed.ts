import { Message } from "../../domain/valueObjects/Message";
import { User } from "../../domain/valueObjects/User";

export class MessageParsed {
    private user: User;
    private message: Message;

    constructor(userId: string, userName: string, message: string) {
        this.user = new User(userId, userName);
        this.message = new Message(message);
    }

    public getUser(): User {
        return this.user;
    }

    public getMessage(): Message {
        return this.message;
    }
}
