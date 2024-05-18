import { CITIES, COUNTRIES, REGIONS, TYPES } from "./common.js";

const FILM = {
    'base': [
        'analog',
        'analogphotography',
        'film',
        'filmcamera',
        'filmphotography',
    ],
    'cameras': [
        'agat18k',
        'fed',
        'mamiya',
        'olympus',
        'praktica',
        'smena',
        'zenit',
        'zorki',
    ],
    'lenses': [
        'helios',
        'industar',
        'jupiter',
        'sekor',
        'zuiko'
    ],
    'types': [
        ...TYPES,
    ],
    'places': [
        ...REGIONS,
        ...COUNTRIES,
        ...CITIES
    ],
    'film': [
        'fomapan',
        'fujifilm',
        'ilfordphoto',
        'kodak',
        'madewithkodak',
        'portra',
        'rollei',
        'cinestillfilm',
        'heylomography'
    ],
    'type': [
        '120film',
        '35mm',
        'bnw',
    ],
    'comms': [
        'afilmcosmos',           
        'bnw_demand',          
        'bnwpoland',             
        'filmwave',              
        'goldmoony',             
        'infilmwetrust',         
        'kodakprofessional',     
        'loadfilm',              
        'lowqualityfilmsociety', 
        'mystreet_bnw',          
        'noirfilm',              
        'shootitwithfilm',      
        'street_me_up',          
        'spsociety',             
        'the35mmdiary',          
        'twohourphoto',          
    ]
}

export { FILM };