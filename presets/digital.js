import { CITIES, COUNTRIES, REGIONS, TYPES, WEATHER } from "./common.js";

const DIGITAL = {
    'base': [
        'digital',
        'digitalphotography'
    ],
    'types': [
        ...TYPES,
        'drone',
    ],
    'weather': [
        ...WEATHER,
    ],
    'places': [
        ...REGIONS,
        ...COUNTRIES,
        ...CITIES
    ],
    'company': [
        'dji',
        'sony',
        'canon',
        'nikon',
    ]
}

export { DIGITAL };