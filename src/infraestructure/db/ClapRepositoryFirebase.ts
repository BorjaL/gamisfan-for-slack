import { Clap } from "../../domain/Clap";
import { ClapRepository } from "../../domain/ClapRepository";
import { logger } from "../../logger";
import db from "./firebaseDatabase";

export class ClapRepositoryFirebase implements ClapRepository {
    private db: any = db;

    public create(clap: Clap): void {
        const userRef = this.db.ref("domains").child(clap.teamId()).child(clap.clapperName());

        userRef.push({
            mate: clap.receiverName(),
            text: clap.getMessage(),
        });
    }
}
