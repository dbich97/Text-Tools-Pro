import { daleChallWordList } from './daleChallWordList';

const getGradeLevel = (score: number) => {
    if (score <= 4.9) return 'Grade 4 and below';
    if (score <= 5.9) return 'Grades 5-6';
    if (score <= 6.9) return 'Grades 7-8';
    if (score <= 7.9) return 'Grades 9-10';
    if (score <= 8.9) return 'Grades 11-12';
    if (score <= 9.9) return 'Grades 13-15 (College)';
    return 'Grades 16+ (College Graduate)';
};

export const analyzeDaleChall = (text: string) => {
    const trimmedText = text.trim();

    if (trimmedText === '') {
        return {
            score: 0,
            gradeLevel: 'N/A',
            words: 0,
            sentences: 0,
            difficultWords: 0,
            percentDifficultWords: '0.0%',
        };
    }

    const sentences = trimmedText.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const sentenceCount = sentences.length || 1;
    
    const words = trimmedText.split(/\s+/).filter(Boolean);
    const wordCount = words.length;

    if (wordCount < 100) {
        return {
            score: 0,
            gradeLevel: 'Text too short (needs 100+ words)',
            words: wordCount,
            sentences: sentenceCount,
            difficultWords: 0,
            percentDifficultWords: '0.0%',
        };
    }

    // Count difficult words (words not on the Dale-Chall list)
    const difficultWordCount = words.reduce((acc, word) => {
        const cleanWord = word.toLowerCase().replace(/[^a-z]/g, '');
        if (cleanWord && !daleChallWordList.has(cleanWord)) {
            return acc + 1;
        }
        return acc;
    }, 0);

    const percentDifficultWords = (difficultWordCount / wordCount) * 100;
    const avgSentenceLength = wordCount / sentenceCount;

    // Dale-Chall Formula
    const rawScore = (0.1579 * percentDifficultWords) + (0.0496 * avgSentenceLength);
    
    const finalScore = percentDifficultWords > 5 ? rawScore + 3.6365 : rawScore;

    return {
        score: finalScore,
        gradeLevel: getGradeLevel(finalScore),
        words: wordCount,
        sentences: sentenceCount,
        difficultWords: difficultWordCount,
        percentDifficultWords: `${percentDifficultWords.toFixed(1)}%`,
    };
};