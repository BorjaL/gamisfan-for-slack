export class Team {
    private id: string;
    private domain: string;

    constructor(teamId: string, teamDomain: string) {
        this.id = teamId;
        this.domain = teamDomain;
    }

    public getId() {
        return this.id;
    }
}
