import { ClapController } from "../../../src/infraestructure/controller/ClapController";
import { ClapRepository } from "../../../src/domain/ClapRepository";
import { NotificationSender } from "../../../src/domain/NotificationSender";

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
            const ClapRepositoryMock = jest.fn<ClapRepository, []>(() => ({
              create: jest.fn(() => true),
            }));

            const NotificationSenderMock = jest.fn<NotificationSender, []>(() => ({
              send: jest.fn(),
            }));

            const clapRepository = new ClapRepositoryMock();
            const notificationSender = new NotificationSenderMock();

            const controller = new ClapController(clapRepository, notificationSender);
            await controller.createClap(mockContext, jest.fn())

            expect(mockContext.status).toBe(200);
        });

        it("returns an error from the repository", async () => {
            const mockContext = <any>{
                request: {
                    body: {
                        text: "<@userId|userName> message"
                    }
                }
            }
            const ClapRepositoryMock = jest.fn<ClapRepository, []>(() => ({
              create: jest.fn(() => {throw new TypeError("Database do not respond");}),
            }));

            const NotificationSenderMock = jest.fn<NotificationSender, []>();

            const clapRepository = new ClapRepositoryMock();
            const notificationSender = new NotificationSenderMock();

            const controller = new ClapController(clapRepository, notificationSender);
            await controller.createClap(mockContext, jest.fn())

            expect(mockContext.status).toBe(500);
        });


        it("returns an error because", async () => {
            const mockContext = <any>{
                request: {
                    body: {
                        text: "Bad format message"
                    }
                }
            }
            const ClapRepositoryMock = jest.fn<ClapRepository, []>();
            const NotificationSenderMock = jest.fn<NotificationSender, []>();

            const clapRepository = new ClapRepositoryMock();
            const notificationSender = new NotificationSenderMock();

            const controller = new ClapController(clapRepository, notificationSender);
            await controller.createClap(mockContext, jest.fn())

            expect(mockContext.status).toBe(200);
        });
    });
});


