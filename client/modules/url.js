import { TAGS } from '../presets/index.js';
import { DEFAULT_PRESET_KEY, PARAMS_KEYS, PRESET_KEY } from './constants.js';

function get() {
    return new URLSearchParams(document.location.search);
}

function set(key, value) {
    if (!PARAMS_KEYS.includes(key)) return;
    const params = new URLSearchParams(document.location.search);
    params.set(key, value);
    window.location.search = params;
}

function remove(key) {
    if (!PARAMS_KEYS.includes(key)) return;
    const params = new URLSearchParams(document.location.search);
    params.delete(key);
    window.location.search = params;
}

function getPreset() {
    const params = get();
    const key = params.get(PRESET_KEY);
    if (Object.keys(TAGS).includes(key)) {
        return TAGS[key]
    } else {
        set(PRESET_KEY, DEFAULT_PRESET_KEY);
        return TAGS[DEFAULT_PRESET_KEY];
    }
}

export { 
    get as getParams,
    set as setParams,
    remove as removeParams, 
    getPreset
 };