import { getMaxLength, getMaxTags } from './storage.js';
import { LOCAL_STORAGE_NAME, DEFAULT_MAX_LENGTH, DEFAULT_MAX_TAGS } from './constants';
import { tokens } from '../classes/TokenCollection.ts';

const input = document.getElementById('input');
const settingsControl = document.getElementById('settings-control');
const settingsMenu = document.getElementById('settings-menu');
const closeSettingsMenu = document.getElementById('close-settings-menu');
const settingsInputLength = document.getElementById('settings-input-length');
const settingsInputCount = document.getElementById('settings-input-count');

settingsControl.addEventListener('click', openMenu);
closeSettingsMenu.addEventListener('click', closeMenu);

function isAllowedKey(key) {
    return ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp'].includes(key);
}

function numbersOnly(e) {
    if (isNaN(e.key) && !isAllowedKey(e.key)) e.preventDefault();
}

settingsInputLength.addEventListener('keydown', numbersOnly);
settingsInputCount.addEventListener('keydown', numbersOnly);

function save() {
    localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify({ 
        maxTags: settingsInputCount.value || DEFAULT_MAX_TAGS, 
        maxLength: settingsInputLength.value || DEFAULT_MAX_LENGTH
    }));
    tokens.max = getMaxLength();
    window.dispatchEvent(new Event('load'));
    input.dispatchEvent(new Event('input'));
}

function openMenu() {
    settingsMenu.style.transform = 'translateY(-100%)';
}

function closeMenu() {
    settingsMenu.style.transform = 'translateY(0)';
    save();
}

function init() {
    const maxTags = getMaxTags();
    const maxLength = getMaxLength();
    settingsInputLength.value = maxLength;
    settingsInputLength.placeholder = DEFAULT_MAX_LENGTH;
    settingsInputCount.value = maxTags;
    settingsInputCount.placeholder = DEFAULT_MAX_TAGS;
    return { maxTags, maxLength };
}

export { 
    init as initSettings,
    save as saveSettings,
    openMenu as openSettingsMenu, 
    closeMenu as closeSettingsMenu
};