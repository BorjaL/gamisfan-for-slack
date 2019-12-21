import { Message } from "../../domain/valueObjects/Message";
import { User } from "../../domain/valueObjects/User";

export class MessageParsed {
    private user: User;
    private message: Message;
    private parsed: boolean;

    constructor(userId: string, userName: string, message: string) {
        if (userId === undefined || userName === undefined || message === undefined ) {
            this.parsed = false;
        }
        else {
            this.user = new User(userId, userName);
            this.message = new Message(message);
            this.parsed = true;
        }
    }

    public getUser(): User {
        return this.user;
    }

    public getMessage(): Message {
        return this.message;
    }
}
