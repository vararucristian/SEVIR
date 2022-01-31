import { Details } from "./details.model";

export class Suggestion {
    longitude: number;
    latitude: number;
    placeName: string;
    interest: string;
    placeName_en: string;
    distance: number;
    details: Details;
}
