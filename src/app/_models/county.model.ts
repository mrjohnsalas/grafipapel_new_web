import { City } from "./city.model";

export interface County {
    id: string;
    name: string;
    cityId: string;
    city?: City;
}