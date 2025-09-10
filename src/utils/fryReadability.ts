import { countSyllables } from './syllableCounter';

// This data represents the zones of the Fry Readability Graph.
// Each entry defines the upper bounds for syllables and sentences for a given grade level.
const fryGraphData = [
    { grade: 1, maxSyllables: 122, maxSentences: 25.0 },
    { grade: 2, maxSyllables: 125, maxSentences: 14.3 },
    { grade: 3, maxSyllables: 128, maxSentences: 11.1 },
    { grade: 4, maxSyllables: 132, maxSentences: 9.1 },
    { grade: 5, maxSyllables: 139, maxSentences: 7.7 },
    { grade: 6, maxSyllables: 145, maxSentences: 6.7 },
    { grade: 7, maxSyllables: 152, maxSentences: 5.9 },
    { grade: 8, maxSyllables: 156, maxSentences: 5.2 },
    { grade: 9, maxSyllables: 161, maxSentences: 4.8 },
    { grade: 10, maxSyllables: 167, maxSentences: 4.3 },
    { grade: 11, maxSyllables: 172, maxSentences: 4.0 },
    { grade: 12, maxSyllables: 179, maxSentences: 3.7 },
    { grade: 13, maxSyllables: 182, maxSentences: 3.6 }, // College
];

const getGradeLevelFromFry = (avgSyllables: number, avgSentences: number): string => {
    // Find the first grade level where both metrics are within the bounds.
    for (const level of fryGraphData) {
        if (avgSyllables <= level.maxSyllables && avgSentences >= level.maxSentences) {
            if (level.grade < 13) {
                return `${level.grade}${level.grade === 1 ? 'st' : level.grade === 2 ? 'nd' : level.grade === 3 ? 'rd' : 'th'} Grade`;
            } else {
                return `College Level`;
            }
        }
    }
    // If the scores are higher than the defined graph, it's considered post-college level.
    return "College Graduate+";
};

export const analyzeFryReadability = (text: string) => {
    const trimmedText = text.trim();
    const words = trimmedText.split(/\s+/).filter(Boolean);
    const wordCount = words.length;

    if (wordCount < 100) {
        return {
            gradeLevel: 'Text too short',
            avgSentencesPer100: 'N/A',
            avgSyllablesPer100: 'N/A',
        };
    }

    const sentences = trimmedText.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const sentenceCount = sentences.length || 1;
    const syllableCount = words.reduce((acc, word) => acc + countSyllables(word), 0);

    const avgSentencesPer100 = (sentenceCount / wordCount) * 100;
    const avgSyllablesPer100 = (syllableCount / wordCount) * 100;
    
    const gradeLevel = getGradeLevelFromFry(avgSyllablesPer100, avgSentencesPer100);

    return {
        gradeLevel: gradeLevel,
        avgSentencesPer100: avgSentencesPer100.toFixed(1),
        avgSyllablesPer100: avgSyllablesPer100.toFixed(1),
    };
};