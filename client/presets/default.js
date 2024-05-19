import { CITIES, COUNTRIES, REGIONS, VIEWS, WEATHER } from './common.js';

const DEFAULT = {
    'views': [
        ...VIEWS,
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