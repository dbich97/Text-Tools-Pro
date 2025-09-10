import { countSyllables } from './syllableCounter';

const getScoreInterpretation = (score: number) => {
    if (score >= 90) return { text: 'Very Easy to Read', color: 'text-green-600 dark:text-green-400' };
    if (score >= 80) return { text: 'Easy to Read', color: 'text-green-600 dark:text-green-400' };
    if (score >= 70) return { text: 'Fairly Easy to Read', color: 'text-lime-600 dark:text-lime-400' };
    if (score >= 60) return { text: 'Standard / Plain English', color: 'text-yellow-600 dark:text-yellow-400' };
    if (score >= 50) return { text: 'Fairly Difficult to Read', color: 'text-orange-600 dark:text-orange-400' };
    if (score >= 30) return { text: 'Difficult to Read', color: 'text-red-600 dark:text-red-400' };
    return { text: 'Very Difficult to Read', color: 'text-red-700 dark:text-red-500' };
};

export const analyzeReadability = (text: string) => {
    const trimmedText = text.trim();

    if (trimmedText === '') {
        return {
            score: 0,
            gradeLevel: 'N/A',
            interpretation: { text: 'Not enough text', color: 'text-gray-500' },
            words: 0,
            sentences: 0,
            syllables: 0,
            avgWordsPerSentence: '0.0',
            avgSyllablesPerWord: '0.0',
        };
    }

    const words = trimmedText.split(/\s+/).filter(Boolean);
    const sentences = trimmedText.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    const wordCount = words.length;
    const sentenceCount = sentences.length || 1; // Avoid division by zero
    const syllableCount = words.reduce((acc, word) => acc + countSyllables(word), 0);
    
    if (wordCount === 0 || sentenceCount === 0) {
        return {
            score: 0,
            gradeLevel: 'N/A',
            interpretation: { text: 'Not enough text', color: 'text-gray-500' },
            words: 0,
            sentences: 0,
            syllables: 0,
            avgWordsPerSentence: '0.0',
            avgSyllablesPerWord: '0.0',
        };
    }

    const avgWordsPerSentence = wordCount / sentenceCount;
    const avgSyllablesPerWord = syllableCount / wordCount;

    // Flesch-Kincaid Reading Ease formula
    const score = 206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord;
    const boundedScore = Math.max(0, Math.min(100, score));

    // Flesch-Kincaid Grade Level formula
    const gradeLevel = 0.39 * avgWordsPerSentence + 11.8 * avgSyllablesPerWord - 15.59;
    const roundedGrade = Math.round(gradeLevel);
    
    let gradeDisplay;
    if (roundedGrade <= 0) gradeDisplay = "Before 1st Grade";
    else if (roundedGrade >= 13) gradeDisplay = "College Graduate";
    else gradeDisplay = `${roundedGrade}${roundedGrade === 1 ? 'st' : roundedGrade === 2 ? 'nd' : roundedGrade === 3 ? 'rd' : 'th'} Grade`;


    return {
        score: boundedScore,
        gradeLevel: gradeDisplay,
        interpretation: getScoreInterpretation(boundedScore),
        words: wordCount,
        sentences: sentenceCount,
        syllables: syllableCount,
        avgWordsPerSentence: avgWordsPerSentence.toFixed(1),
        avgSyllablesPerWord: avgSyllablesPerWord.toFixed(1),
    };
};