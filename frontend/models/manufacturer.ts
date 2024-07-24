export class Manufacturer {
    declare id: number;
    declare name: string;
    declare description: string | null;
    declare created_at: string;

    constructor(other: Manufacturer) {
        this.id = other.id;
        this.name = other.name;
        this.description = other.description;
        this.created_at = other.created_at;
    }
}

export class CreateUpdateManufacturer {
    declare name: string;
    declare description: string;

    constructor(other: CreateUpdateManufacturer) {
        this.name = other.name;
        this.description = other.description;
    }
}
