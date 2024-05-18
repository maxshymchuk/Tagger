const TAGS = {
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
    'places': [
        'belarus',
        'poland',
        'lida',
        'gomel',
        'minsk',
        'krakow',
        'warsaw',
        'wroclaw',
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

const LOCAL_STORAGE_NAME = 'tagger-storage';
const DEFAULT_MAX_TAGS = 30;
const DEFAULT_MAX_LENGTH = 24;

export { TAGS, DEFAULT_MAX_TAGS, DEFAULT_MAX_LENGTH, LOCAL_STORAGE_NAME }