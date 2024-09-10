import { getMaxLength, getMaxTags } from './storage.js';
import { initSettings } from './settings.js';
import { initTags, updateTags } from './tags.js';
import { closeAuthMenu, initAuth, openAuthMenu } from './auth.js';
import { tokens } from '../classes/TokenCollection.ts';

const input = document.getElementById('input');
const output = document.getElementById('output');
const copyControl = document.getElementById('copy-control');
const clearControl = document.getElementById('clear-control');
const description = document.getElementById('description');
const countControls = document.querySelectorAll('.control.counter');

input.addEventListener('input', update);
window.addEventListener('load', init);

function operate(tokens) {
    const maxTags = getMaxTags();
    if (tokens.collection.length > maxTags) {
        countControls.forEach(count => count.classList.add('warning'));
    } else {
        countControls.forEach(count => count.classList.remove('warning'))
    }
    countControls.forEach(count => count.innerText = `${tokens.collection.length} / ${maxTags}`);
    output.value = tokens.tags.join(' ');
}

function update() {
    tokens.fill(input.value)
    operate(tokens);
    updateTags();
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
    if (!confirm('Do you want to delete everything?')) return;
    input.value = '';
    update();
});

async function init() {
    const isAuth = await initAuth();
    if (isAuth) {
        closeAuthMenu();
    } else {
        openAuthMenu();
        return;
    }
    const { maxTags, maxLength } = initSettings();
    countControls.forEach(count => count.innerText = `0 / ${maxTags}`);
    description.innerText = `Unsupported symbols will be omitted, max tag length is ${maxLength} letters`;
    tokens.max = getMaxLength();
    initTags();
}