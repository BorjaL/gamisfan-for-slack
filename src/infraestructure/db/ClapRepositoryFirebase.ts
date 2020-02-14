import { Clap } from "../../domain/Clap";
import { IClapRepository } from "../../domain/IClapRepository";
import { logger } from "../../logger";
import db from "./firebaseDatabase";

export class ClapRepositoryFirebase implements IClapRepository {
    private db: any = db;

    public create(clap: Clap): void {
        const userRef = this.db.ref("domains").child(clap.teamId()).child(clap.clapperName());

        userRef.push({
            mate: clap.receiverName(),
            text: clap.getMessage(),
        });
    }
}
