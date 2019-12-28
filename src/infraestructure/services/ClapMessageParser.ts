import { MessageParsed } from "../controller/MessageParsed";

export class ClapMessageParser {
    public static async parse(message: string): Promise<MessageParsed> {
        try {
            const regex = /^<@([0-9A-Za-z]*)\|(.*)>\s*(.*)$/;
            const matches = await regex.exec(message);

            return new MessageParsed(matches[1], matches[2], matches[3]);
        } catch (e) {
            throw new Error(`Bad format in < ${message} >`);
        }
    }
}
