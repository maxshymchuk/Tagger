import { MAX_TAGS, TAGS } from './constants/tags.js';

const input = document.getElementById('input');
const output = document.getElementById('output');

const tagsControl = document.getElementById('tags-control');
const countControls = document.querySelectorAll('.counter');
const copyControl = document.getElementById('copy-control');
const clearControl = document.getElementById('clear-control');

const sidemenu = document.querySelector('.sidemenu');
const closeSidemenu = document.querySelector('.close-sidemenu');

const tagsSectionsWrapper = document.getElementById('tags-sections-wrapper');

const tagSectionTemplate = document.getElementById('tag-section-template')

tagsSectionsWrapper.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const set = new Set(input.value.split(' ').filter(i => !!i));
        const isSelected = e.target.classList.contains('selected');
        if (isSelected) {
            e.target.classList.remove('selected');
            set.delete(e.target.id.replace('tag-', ''));
        } else {
            e.target.classList.add('selected');
            set.add(e.target.id.replace('tag-', ''));
        }
        input.value = [...set].join(' ');
        operate(sortTags());
    }
});

function createTagSection(key, tags) {
    const tagTemplate = tagSectionTemplate.content.querySelector('.tag');
    const tagsSection = tagSectionTemplate.cloneNode(true).content.querySelector('.tags-section');
    const titleDom = tagsSection.querySelector('.tags-title');
    const wrapperDom = tagsSection.querySelector('.tags-wrapper');
    titleDom.textContent = key;
    wrapperDom.replaceChildren(...tags.map(tag => {
        const element = tagTemplate.cloneNode(true);
        element.setAttribute('id', `tag-${tag}`);
        element.textContent = tag;
        return element;
    }));
    tagsSectionsWrapper.append(tagsSection);
}

function initTags() {
    Object.keys(TAGS).forEach(key => createTagSection(key, TAGS[key]));
}

function reset() {
    tagsSectionsWrapper.querySelectorAll('button').forEach(button => button.classList.remove('selected'));
}

function sortTags() {
    reset();
    const set = new Set();
    const content = input.value
        .split(' ')
        .filter(i => !!i && i !== '#')
        .map(i => i.toLowerCase().replace(/[^\p{L}\p{N}_]+/gu, ''))
        .filter(i => !!i)
        .map(i => i.substring(0, 24))
        .sort();
    for (const i of content) {
        set.add(i);
        const button = tagsSectionsWrapper.querySelector(`#tag-${i}`);
        if (button) button.classList.add('selected');
    }
    return set;
}

function operate(tags) {
    if (tags.size > MAX_TAGS) {
        countControls.forEach(count => count.classList.add('warning'));
    } else {
        countControls.forEach(count => count.classList.remove('warning'))
    }
    countControls.forEach(count => count.innerText = `${tags.size} / ${MAX_TAGS}`);
    output.value = [...tags].map(i => `#${i}`).join(' ');
}

copyControl.addEventListener('click', async () => {
    if (!output.value) return;
    try {
        await navigator.clipboard.writeText(output.value);
        alert('Copied!');
    } catch (error) {
        console.error(error.message);
    }
});

clearControl.addEventListener('click', () => {
    if (confirm('Do you want to delete everything?')) {
        input.value = '';
        operate(sortTags());
    }
});

tagsControl.addEventListener('click', () => {
    sidemenu.style.transform = 'translateY(-100%)'
});

closeSidemenu.addEventListener('click', () => {
    sidemenu.style.transform = 'translateY(0)'
});

input.addEventListener('input', () => {
    operate(sortTags());
});

window.addEventListener('load', () => {
    countControls.forEach(count => count.innerText = `0 / ${MAX_TAGS}`);
    initTags();
});