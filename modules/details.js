import { render as renderTags } from './tags.js';
import { TAGS } from "../constants/tags.js";

function getDetails() {
    return document.querySelectorAll('details');
}

function closeAll() {
    document.querySelectorAll('details').forEach(details => details.setAttribute('open', false));
}

function open() {
    closeAll();
}

function createDetails() {
    const tagsTemplate = document.getElementById('template-tags');
    const nodes = [];
    Object.keys(TAGS).forEach(key => {
        const tagsDetails = tagsTemplate.content.querySelector('summary');
        const tagsDiv = tagsTemplate.content.querySelector('div');
        tagsDetails.innerText = key;
        tagsDiv.setAttribute('id', key);
        nodes.push(tagsTemplate.content.cloneNode(true));
    })
    return nodes;
}

function render(container) {
    if (!container) return;
    const nodes = createDetails();
    container.append(...nodes);
}

export { getDetails, render };