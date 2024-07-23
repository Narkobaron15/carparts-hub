import User from "./user";

export default class Seller {
    declare user: User;
    declare user_id: number;
    declare name: string;
    declare description: string | null;
    declare created_at: string;

    constructor(other: Seller) {
        this.user = other.user;
        this.user_id = other.user_id;
        this.name = other.name;
        this.description = other.description;
        this.created_at = other.created_at;
    }
}
