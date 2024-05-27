import { getMaxTags } from './storage.js';
import { initSettings } from './settings.js';
import { initTags, sortTags } from './tags.js';
import { closeAuthMenu, initAuth, openAuthMenu } from './auth.js';

const splashscreen = document.getElementById('splashscreen');
const input = document.getElementById('input');
const output = document.getElementById('output');
const copyControl = document.getElementById('copy-control');
const clearControl = document.getElementById('clear-control');
const description = document.getElementById('description');
const countControls = document.querySelectorAll('.control.counter');

input.addEventListener('input', update);
window.addEventListener('load', init);

function operate(tags) {
    const maxTags = getMaxTags();
    if (tags.size > maxTags) {
        countControls.forEach(count => count.classList.add('warning'));
    } else {
        countControls.forEach(count => count.classList.remove('warning'))
    }
    countControls.forEach(count => count.innerText = `${tags.size} / ${maxTags}`);
    output.value = [...tags].map(i => `#${i}`).join(' ');
}

function update() {
    operate(sortTags());
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
    splashscreen.style.opacity = '0';
    splashscreen.style.visibility = 'hidden';
    if (isAuth) {
        closeAuthMenu();
    } else {
        openAuthMenu();
        return;
    }
    const { maxTags, maxLength } = initSettings();
    countControls.forEach(count => count.innerText = `0 / ${maxTags}`);
    description.innerText = `Unsupported symbols will be omitted, max tag length is ${maxLength} letters`;
    initTags();
}