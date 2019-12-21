import { Clap } from "./clap";

export interface IClapRepository {
    create(clap: Clap): boolean;
}
