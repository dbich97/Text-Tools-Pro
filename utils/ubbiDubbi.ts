const isVowel = (char: string): boolean => {
    return 'aeiouAEIOU'.includes(char);
};

export const textToUbbiDubbi = (text: string): string => {
    if (!text) return '';

    let result = '';
    let inVowelGroup = false;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (isVowel(char)) {
            if (!inVowelGroup) {
                result += 'ub' + char;
                inVowelGroup = true;
            } else {
                result += char;
            }
        } else {
            result += char;
            inVowelGroup = false;
        }
    }
    return result;
};


export const ubbiDubbiToText = (text: string): string => {
    if (!text) return '';
    // Use a regex to find 'ub' followed by a vowel, and replace it with just the vowel.
    // The case-insensitive flag 'i' is important here.
    return text.replace(/ub([aeiou])/gi, '$1');
};