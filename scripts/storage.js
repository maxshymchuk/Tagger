import { DEFAULT_MAX_TAGS, DEFAULT_MAX_LENGTH, LOCAL_STORAGE_NAME } from './constants.js';

function getStorage() {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME)) ?? {};
}

function getMaxTags() {
    const { maxTags } = getStorage();
    return maxTags ?? DEFAULT_MAX_TAGS;
}

function getMaxLength() {
    const { maxLength } = getStorage();
    return maxLength ?? DEFAULT_MAX_LENGTH;
}

export { getStorage, getMaxLength, getMaxTags };