import { Clap } from "../domain/Clap";
import { ClapRepository } from "../domain/ClapRepository";
import { NotificationSender } from "../domain/NotificationSender";
import { Message } from "../domain/valueObjects/Message";
import { Team } from "../domain/valueObjects/Team";
import { User } from "../domain/valueObjects/User";

export class CreateClapAction {
    private repository: ClapRepository;
    private notificationSender: NotificationSender;

    constructor(repository: ClapRepository, notificationSender: NotificationSender) {
        this.repository = repository;
        this.notificationSender = notificationSender;
    }

    public create(team: Team, clapper: User, receiver: User, message: Message): void {
        const clap = new Clap(team, clapper, receiver, message);

        this.repository.create(clap);
        this.notificationSender.send(receiver, message);
    }
}
