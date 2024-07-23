export default class User {
    declare id: number;
    declare username: string;
    declare email: string;
    declare created_at: string;

    constructor(other: User) {
        this.id = other.id;
        this.username = other.username;
        this.email = other.email;
        this.created_at = other.created_at;
    }
}