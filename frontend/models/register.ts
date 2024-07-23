export default class Register {
    declare username: string;
    declare email: string;
    declare password: string;
    declare password_confirmation: string;
    
    constructor(other: Register) {
        this.username = other.username;
        this.email = other.email;
        this.password = other.password;
        this.password_confirmation = other.password_confirmation;
    }
}