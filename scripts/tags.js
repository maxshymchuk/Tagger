import { getMaxLength } from './storage.js';
import { getPreset } from './url.js';

const input = document.getElementById('input');
const tagsControl = document.getElementById('tags-control');
const tagsMenu = document.getElementById('tags-menu');
const closeTagsMenu = document.getElementById('close-tags-menu');
const tagsSectionsWrapper = document.getElementById('tags-sections-wrapper');
const tagSectionTemplate = document.getElementById('tag-section-template')

tagsSectionsWrapper.addEventListener('click', handleTagClick);
tagsControl.addEventListener('click', openMenu);
closeTagsMenu.addEventListener('click', closeMenu);

function openMenu() { 
    tagsMenu.style.transform = 'translateY(-100%)';
}

function closeMenu() {
    tagsMenu.style.transform = 'translateY(0)';
}

function reset() {
    tagsSectionsWrapper.querySelectorAll('button').forEach(button => button.classList.remove('selected'));
}

function handleTagClick(e) {
    if (!e.target.tagName === 'BUTTON') return;
    const set = new Set(input.value.split(' ').filter(i => !!i));
    const newId = e.target.id.replace('tag-', '');
    if (e.target.classList.contains('selected')) {
        e.target.classList.remove('selected');
        set.delete(newId);
    } else {
        e.target.classList.add('selected');
        set.add(newId);
    }
    input.value = [...set].join(' ');
    input.dispatchEvent(new Event('input'));
}

function createTagSection(key, tags) {
    const tagTemplate = tagSectionTemplate.content.querySelector('.tag');
    const tagsSection = tagSectionTemplate.cloneNode(true).content.querySelector('.tags-section');
    const titleDom = tagsSection.querySelector('.title');
    const wrapperDom = tagsSection.querySelector('.section-wrapper');
    titleDom.textContent = key;
    wrapperDom.replaceChildren(...tags.map(tag => {
        const element = tagTemplate.cloneNode(true);
        element.setAttribute('id', `tag-${tag}`);
        element.textContent = tag;
        return element;
    }));
    tagsSectionsWrapper.append(tagsSection);
}

function sort() {
    const set = new Set();
    const content = input.value
        .split(' ')
        .filter(i => !!i && i !== '#')
        .map(i => i.toLowerCase().replace(/[^\p{L}\p{N}_]+/gu, ''))
        .filter(i => !!i)
        .map(i => i.substring(0, getMaxLength()))
        .sort();
    for (const i of content) {
        set.add(i);
        const button = tagsSectionsWrapper.querySelector(`#tag-${i}`);
        if (button) button.classList.add('selected');
    }
    return set;
}

function init() {
    const PRESET = getPreset();
    Object.keys(PRESET).forEach(key => createTagSection(key, PRESET[key]));
}

export { 
    init as initTags,
    sort as sortTags,
    reset as resetTags,
    openMenu as openTagsMenu, 
    closeMenu as closeTagsMenu
};