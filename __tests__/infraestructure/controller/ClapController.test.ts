import { ClapController } from "../../../src/infraestructure/controller/ClapController";
import { IClapRepository } from "../../../src/domain/IClapRepository";
import { INotificationSender } from "../../../src/domain/INotificationSender";

describe("ClapController", () => {
    describe("createClap", () => {
        it("happy path", async () => {
            const mockContext = <any>{
                request: {
                    body: {
                        text: "<@userId|userName> message"
                    }
                }
            }
            const ClapRepositoryMock = jest.fn<IClapRepository, []>(() => ({
              create: jest.fn(() => true),
            }));

            const NotificationSenderMock = jest.fn<INotificationSender, []>(() => ({
              send: jest.fn(),
            }));

            const clapRepository = new ClapRepositoryMock();
            const notificationSender = new NotificationSenderMock();

            const controller = new ClapController(clapRepository, notificationSender);
            await controller.createClap(mockContext, jest.fn())

            expect(mockContext.status).toBe(200);
        });
    });
});

