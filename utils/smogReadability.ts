import { countSyllables } from './syllableCounter';

export const analyzeSmog = (text: string) => {
    const trimmedText = text.trim();
    
    const sentences = trimmedText.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const sentenceCount = sentences.length;

    if (sentenceCount < 30) {
        return {
            grade: 0,
            gradeLevel: 'Text too short (needs 30+ sentences)',
            sentences: sentenceCount,
            polysyllables: 0,
        };
    }

    const words = trimmedText.split(/\s+/).filter(Boolean);

    // A "polysyllable" is a word with 3 or more syllables.
    const polysyllableCount = words.reduce((acc, word) => {
        if (countSyllables(word) >= 3) {
            return acc + 1;
        }
        return acc;
    }, 0);

    // SMOG formula
    const grade = 1.0430 * Math.sqrt(polysyllableCount * (30 / sentenceCount)) + 3.1291;

    return {
        grade,
        gradeLevel: `Grade ${grade.toFixed(1)}`,
        sentences: sentenceCount,
        polysyllables: polysyllableCount,
    };
};
