import { Country } from "./country.model";

export interface State {
    id: string;
    name: string;
    countryId: string;
    country: Country
}