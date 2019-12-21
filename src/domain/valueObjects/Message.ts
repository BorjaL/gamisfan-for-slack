export class Message {
    private value: string;

    constructor(message: string) {
        this.value = message;
    }

    public getValue() {
        return this.value;
    }
}
