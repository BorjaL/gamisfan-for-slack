import { Message } from "./valueObjects/Message";
import { Team } from "./valueObjects/Team";
import { User } from "./valueObjects/User";

export class Clap {
    private team: Team;
    private clapper: User;
    private receiver: User;
    private message: Message;

    constructor(team: Team, clapper: User, receiver: User, message: Message) {
        this.team = team;
        this.clapper = clapper;
        this.receiver = receiver;
        this.message = message;
    }

    public teamId() {
        return this.team.getId();
    }

    public clapperName() {
        return this.clapper.getName();
    }

    public receiverName() {
        return this.receiver.getName();
    }

    public getMessage() {
        return this.message.getValue();
    }
}
