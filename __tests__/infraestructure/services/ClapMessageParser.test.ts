import { ClapMessageParser } from "../../../src/infraestructure/services/ClapMessageParser";
import { MessageParsed } from "../../../src/infraestructure/controller/MessageParsed";

describe("ClapMessageParser", () => {
    describe("method parse", () => {
        describe("the received text is correct", () => {
            const text: string = "<@userId|userName> message";

            it("parses the user name", async () => {
                const result: MessageParsed = await ClapMessageParser.parse(text);

                expect(result.getUser().getName()).toBe("userName");
            });

            it("parses the user id", async () => {
                const result: MessageParsed = await ClapMessageParser.parse(text);

                expect(result.getUser().getId()).toBe("userId");
            });

            it("parses the message", async () => {
                const result: MessageParsed = await ClapMessageParser.parse(text);

                expect(result.getMessage().getValue()).toBe("message");
            });
        });

        describe("the received text has no message", () => {
            const text: string = "<@userId|userName>";

            it("parses the user name", async () => {
                const result: MessageParsed = await ClapMessageParser.parse(text);

                expect(result.getUser().getName()).toBe("userName");
            });

            it("parses the user id", async () => {
                const result: MessageParsed = await ClapMessageParser.parse(text);

                expect(result.getUser().getId()).toBe("userId");
            });

            it("parses the message with empty value", async () => {
                const result: MessageParsed = await ClapMessageParser.parse(text);

                expect(result.getMessage().getValue()).toBe("");
            });
        });

        describe("the received text has no user information", () => {
            const text: string = "message";

            it("throws a bad format error", async () => {
                await expect(ClapMessageParser.parse(text)).rejects.toMatchObject({ message: `Bad format in < ${text} >`});
            });
        });

        describe("the received text has wrong format in user information", () => {
            const text: string = "@userId message";

            it("throws a bad format error", async () => {
                await expect(ClapMessageParser.parse(text)).rejects.toMatchObject({ message: `Bad format in < ${text} >`});
            });
        });
    });
});
