import Role from './roles'

export default class User {
    declare username: string
    declare email: string
    declare role: Role

    constructor(other: User) {
        this.username = other.username
        this.email = other.email
        this.role = other.role
    }
}
