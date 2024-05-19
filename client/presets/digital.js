import { CITIES, COUNTRIES, REGIONS, VIEWS, WEATHER } from './common.js';

const DIGITAL = {
    'base': [
        'digital',
        'digitalphotography'
    ],
    'views': [
        ...VIEWS,
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