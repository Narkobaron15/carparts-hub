import { Car } from "./car";
import { Manufacturer } from "./manufacturer";
import { Seller } from "./seller";

export class Detail {
    declare id: number;
    declare car: Car;
    declare car_id: number;
    declare name: string;
    declare manufacturer: Manufacturer;
    declare seller: Seller;
    declare notes: string;
    declare created_at: string;

    constructor(other: Detail) {
        this.id = other.id;
        this.car = other.car;
        this.car_id = other.car_id;
        this.name = other.name;
        this.manufacturer = other.manufacturer;
        this.seller = other.seller;
        this.notes = other.notes;
        this.created_at = other.created_at;
    }
}

export class CreateUpdateDetail {
    declare car_id: number | string;
    declare name: string;
    declare manufacturer_id: number | string;
    declare notes: string;

    constructor(other: CreateUpdateDetail) {
        this.car_id = other.car_id;
        this.name = other.name;
        this.manufacturer_id = other.manufacturer_id;
        this.notes = other.notes;
    }
}
