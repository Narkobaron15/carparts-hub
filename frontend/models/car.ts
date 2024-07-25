import { decl } from 'postcss'
import { Manufacturer } from './manufacturer'

export class Car {
    declare id: number
    declare manufacturer: Manufacturer
    declare model: string
    declare year: number
    declare created_at: string

    constructor(other: Car) {
        this.id = other.id
        this.manufacturer = other.manufacturer
        this.model = other.model
        this.year = other.year
        this.created_at = other.created_at
    }
}

export class CreateUpdateCar {
    declare manufacturer_id: number
    declare model: string
    declare year: number

    constructor(other: CreateUpdateCar) {
        this.manufacturer_id = other.manufacturer_id
        this.model = other.model
        this.year = other.year
    }
}
