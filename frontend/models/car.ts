import Manufacturer from "./manufacturer";

export default class Car {
    declare id: number;
    declare manufacturer: Manufacturer;
    declare model: string;
    declare year: number;
    declare created_at: string;

    constructor(other: Car) {
        this.id = other.id;
        this.manufacturer = other.manufacturer;
        this.model = other.model;
        this.year = other.year;
        this.created_at = other.created_at;
    }
}
