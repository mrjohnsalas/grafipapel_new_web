import { State } from "./state.model";

export interface City {
    id: string;
    name: string;
    stateId: string;
    state?: State;
}