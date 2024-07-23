export default class Auth {
    declare username: string;
    declare password: string;

    constructor(other: Auth) {
        this.username = other.username;
        this.password = other.password;
    }
}