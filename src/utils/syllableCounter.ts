// Heuristic-based syllable counter
export const countSyllables = (word: string): number => {
    if (word.length <= 3) return 1;
    word = word.toLowerCase().replace(/[^a-z]/g, '');
    if (!word) return 0;
    
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    word = word.replace(/^y/, '');
    
    const vowelMatches = word.match(/[aeiouy]{1,2}/g);
    
    return vowelMatches ? vowelMatches.length : 1;
};


export const analyzeSyllables = (text: string) => {
    const trimmedText = text.trim();

    if (trimmedText === '') {
        return {
            syllables: 0,
            words: 0,
            avgSyllablesPerWord: '0.0',
        };
    }

    const words = trimmedText.split(/\s+/).filter(Boolean);
    const wordCount = words.length;
    
    if (wordCount === 0) {
        return {
            syllables: 0,
            words: 0,
            avgSyllablesPerWord: '0.0',
        };
    }

    const syllableCount = words.reduce((acc, word) => acc + countSyllables(word), 0);
    const avgSyllablesPerWord = syllableCount / wordCount;
    
    return {
        syllables: syllableCount,
        words: wordCount,
        avgSyllablesPerWord: avgSyllablesPerWord.toFixed(1),
    };
};