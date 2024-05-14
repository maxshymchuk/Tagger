import { TAGS } from "../constants/tags.js";

function createTag(tag) {
    const tagTemplate = document.getElementById('template-tag');
    const tagInput = tagTemplate.content.querySelector('input');
    const tagLabel = tagTemplate.content.querySelector('label');
    tagInput.setAttribute('id', `tag-${tag}`);
    tagLabel.setAttribute('for', `tag-${tag}`);
    tagLabel.textContent = tag;
    return tagTemplate.content.cloneNode(true);
}

function render(container, key) {
    TAGS[key].forEach(tag => container.append(createTag(tag)));
}

export { render };