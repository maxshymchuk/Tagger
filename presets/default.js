import { CITIES, COUNTRIES, REGIONS, TYPES, WEATHER } from "./common.js";

const DEFAULT = {
    'types': [
        ...TYPES,
    ],
    'weather': [
        ...WEATHER,
    ],
    'places': [
        ...REGIONS,
        ...COUNTRIES,
        ...CITIES
    ],
}

export { DEFAULT };