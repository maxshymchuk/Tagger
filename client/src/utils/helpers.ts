function getWordForm(value: number, singular: string, plural: string) {
    return value > 1 ? plural : singular;
}

function isEmpty(obj: Record<string, unknown>) {
    for (const prop in obj) {
        if (Object.hasOwn(obj, prop)) {
            return false;
        }
    }
    return true;
}

export { getWordForm, isEmpty };