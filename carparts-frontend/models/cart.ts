import { Detail } from './detail'

export default class Cart {
    declare id: number
    declare detail: Detail
    declare quantity: number
    declare created_at: string

    constructor(other: Cart) {
        this.id = other.id
        this.detail = other.detail
        this.quantity = other.quantity
        this.created_at = other.created_at
    }
}
