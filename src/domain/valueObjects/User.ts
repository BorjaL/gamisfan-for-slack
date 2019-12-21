export class User {
    private id: string;
    private name: string;

    constructor(userId: string, userName: string) {
        this.id = userId;
        this.name = userName;
    }

    public getName() {
        return this.name;
    }

    public getId() {
        return this.id;
    }
}
