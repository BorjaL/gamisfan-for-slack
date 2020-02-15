import { Message } from "../../src/domain/valueObjects/Message";
import { Team } from "../../src/domain/valueObjects/Team";
import { User } from "../../src/domain/valueObjects/User";
import { Clap } from "../../src/domain/Clap";
import { ClapRepository } from "../../src/domain/ClapRepository";
import { NotificationSender } from "../../src/domain/NotificationSender";
import { CreateClapAction } from "../../src/actions/CreateClapAction";

describe("CreateClapAction", () => {
    const team: Team = new Team('', '');
    const clapper: User = new User('', '');
    const clapReceiver: User = new User('', '');
    const message: Message = new Message('');

    describe("method create", () => {
        test("repository create method is called", async () => {
            const createMethodMock = jest.fn((clap: Clap) => { return true })
            const clapRepositoryMock = createClapRespositoryMock({ create: createMethodMock });

            const createClapAction: CreateClapAction = createAction({ clapRepositoryMock })

            await createClapAction.create(team, clapper, clapReceiver, message);

            expect(clapRepositoryMock.create).toHaveBeenCalled();
        });

        test("notification sender method is called", async () => {
            const notificationSenderMock = createNotificationSenderMock({});
            const createClapAction: CreateClapAction= createAction({ notificationSenderMock })

            await createClapAction.create(team, clapper, clapReceiver, message);

            expect(notificationSenderMock.send).toHaveBeenCalled();
        });
    });
});

function createClapRespositoryMock(mockMethods: any){
    const createMethod = mockMethods.create || jest.fn((clap: Clap) => { return true });

    const ClapRepositoryMock = jest.fn<ClapRepository, []>(() => ({
      create: createMethod,
    }));

    return new ClapRepositoryMock()
}

function createNotificationSenderMock(mockMethods: any){
    const sendMethod = mockMethods.send || jest.fn(() => {});

    const NotificationSenderMock = jest.fn<NotificationSender, []>(() => ({
      send: sendMethod,
    }));

    return new NotificationSenderMock()
}

function createAction(stubs: any) {
    const clapRepositoryMock = stubs.clapRepositoryMock || createClapRespositoryMock({});
    const notificationSenderMock = stubs.notificationSenderMock || createNotificationSenderMock({});

    return new CreateClapAction(clapRepositoryMock, notificationSenderMock);
}
