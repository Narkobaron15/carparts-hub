import User from './user'

export class Seller {
    declare id: number
    declare user: User
    declare user_id: number
    declare name: string
    declare description: string | null
    declare created_at: string

    constructor(other: Seller) {
        this.id = other.id
        this.user = other.user
        this.user_id = other.user_id
        this.name = other.name
        this.description = other.description
        this.created_at = other.created_at
    }
}

export class CreateUpdateSeller {
    declare user_id: number
    declare name: string
    declare description: string | null

    constructor(other: Seller) {
        this.user_id = other.user_id
        this.name = other.name
        this.description = other.description
    }
}
