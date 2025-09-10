import { countSyllables } from './syllableCounter';

export const analyzeGunningFog = (text: string) => {
    const trimmedText = text.trim();
    const words = trimmedText.split(/\s+/).filter(Boolean);
    const wordCount = words.length;

    if (wordCount < 100) {
        return {
            score: 0,
            gradeLevel: 'Text too short (needs 100+ words)',
            words: wordCount,
            sentences: 0,
            complexWords: 0,
        };
    }

    const sentences = trimmedText.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const sentenceCount = sentences.length || 1;

    // A "complex" word has 3 or more syllables.
    const complexWordCount = words.reduce((acc, word) => {
        if (countSyllables(word) >= 3) {
            return acc + 1;
        }
        return acc;
    }, 0);

    const avgSentenceLength = wordCount / sentenceCount;
    const percentComplexWords = (complexWordCount / wordCount) * 100;

    // Gunning Fog Index Formula
    const score = 0.4 * (avgSentenceLength + percentComplexWords);
    const roundedScore = Math.round(score);

    let gradeDisplay;
    if (roundedScore <= 5) gradeDisplay = `Grade ${roundedScore} (Very Easy)`;
    else if (roundedScore <= 8) gradeDisplay = `Grade ${roundedScore} (Easy)`;
    else if (roundedScore <= 12) gradeDisplay = `Grade ${roundedScore} (Standard)`;
    else if (roundedScore <= 16) gradeDisplay = `Grade ${roundedScore} (Difficult)`;
    else gradeDisplay = `Grade ${roundedScore} (Very Difficult)`;

    return {
        score,
        gradeLevel: gradeDisplay,
        words: wordCount,
        sentences: sentenceCount,
        complexWords: complexWordCount,
    };
};