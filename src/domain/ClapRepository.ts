import { Clap } from "./clap";

export interface ClapRepository {
    create(clap: Clap): void;
}
