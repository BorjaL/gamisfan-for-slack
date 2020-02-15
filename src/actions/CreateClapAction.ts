import { Clap } from "../domain/Clap";
import { ClapRepository } from "../domain/ClapRepository";
import { INotificationSender } from "../domain/INotificationSender";
import { Message } from "../domain/valueObjects/Message";
import { Team } from "../domain/valueObjects/Team";
import { User } from "../domain/valueObjects/User";

export class CreateClapAction {
    private repository: ClapRepository;
    private notificationSender: INotificationSender;

    constructor(repository: ClapRepository, notificationSender: INotificationSender) {
        this.repository = repository;
        this.notificationSender = notificationSender;
    }

    public create(team: Team, clapper: User, receiver: User, message: Message): void {
        const clap = new Clap(team, clapper, receiver, message);

        this.repository.create(clap);
        this.notificationSender.send(receiver, message);
    }
}
