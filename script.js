// import { render as renderDetails } from './modules/details.js';

// const button = document.getElementById('button');
// const clear = document.getElementById('clear');

// const tags = document.getElementById('tags');

// function resetTags() {
//     tags.querySelectorAll('input').forEach(i => i.checked = false);
// }

import { MAX_TAGS } from './constants/tags.js';

const input = document.getElementById('input');
const output = document.getElementById('output');
const countControl = document.getElementById('count-control');
const copyControl = document.getElementById('copy-control');
const clearControl = document.getElementById('clear-control');

function sortTags() {
    // resetTags();
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
        // const inputTag = tags.querySelector(`input#tag-${i}`);
        // if (inputTag) inputTag.checked = true;
    }
    return set;
}

// tags.addEventListener('click', (e) => {
//     if (e.target.tagName === 'INPUT') {
//         const set = new Set(input.value.split(' '));
//         e.target.checked ? set.add(e.target.id.replace('tag-', '')) : set.delete(e.target.id.replace('tag-', ''));
//         input.value = [...set].join(' ');
//         sortTags();
//     }
// });

// button.addEventListener('click', sortTags);

// clear.addEventListener('click', () => {
//     input.value = '';
//     sortTags();
// });

function operate(tags) {
    if (tags.size > MAX_TAGS) {
        countControl.classList.add('warning');
    } else {
        countControl.classList.remove('warning');
    }
    countControl.innerText = `${tags.size} / ${MAX_TAGS}`;
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
        operate(new Set());
    }
});

input.addEventListener('input', (e) => {
    const tags = sortTags(e);
    operate(tags);
});

// function main() {
//     renderDetails(tags);
// }

// main();