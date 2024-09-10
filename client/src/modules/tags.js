import { getPreset } from './url.js';
import { tokens } from '../classes/TokenCollection.ts';

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
    if (e.target.tagName !== 'BUTTON') return;
    if (e.target.classList.contains('selected')) {
        e.target.classList.remove('selected');
        tokens.remove(e.target.textContent);
    } else {
        e.target.classList.add('selected');
        tokens.add(e.target.textContent, 0);
    }
    input.value = tokens.array.join(' ');
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
    return tagsSection;
}



function update() {
    for (const token of tokens.array) {
        const button = tagsSectionsWrapper.querySelector(`#tag-${token}`);
        if (button) button.classList.add('selected');
    }
}

function init() {
    const PRESET = getPreset();
    tagsSectionsWrapper.replaceChildren(...Object.keys(PRESET).map(key => createTagSection(key, PRESET[key])));
}

export { 
    init as initTags,
    update as updateTags,
    reset as resetTags,
    openMenu as openTagsMenu, 
    closeMenu as closeTagsMenu
};