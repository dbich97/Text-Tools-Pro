export const analyzeColemanLiau = (text: string) => {
    const trimmedText = text.trim();

    if (trimmedText === '') {
        return {
            score: 0,
            gradeLevel: 'N/A',
            letters: 0,
            words: 0,
            sentences: 0,
        };
    }

    const letters = (trimmedText.match(/[a-zA-Z]/g) || []).length;
    const words = trimmedText.split(/\s+/).filter(Boolean).length;
    const sentences = (trimmedText.match(/[.!?]+/g) || []).length || (words > 0 ? 1 : 0);

    if (words === 0) {
        return {
            score: 0,
            gradeLevel: 'N/A',
            letters: 0,
            words: 0,
            sentences: 0,
        };
    }

    // L is the average number of letters per 100 words
    const l = (letters / words) * 100;
    // S is the average number of sentences per 100 words
    const s = (sentences / words) * 100;

    // Coleman-Liau index formula
    const score = 0.0588 * l - 0.296 * s - 15.8;
    const roundedScore = Math.round(score);

    let gradeDisplay;
    if (roundedScore <= 0) gradeDisplay = "Before 1st Grade";
    else if (roundedScore >= 16) gradeDisplay = "College Graduate+";
    else gradeDisplay = `${roundedScore}${roundedScore === 1 ? 'st' : roundedScore === 2 ? 'nd' : roundedScore === 3 ? 'rd' : 'th'} Grade Level`;
    
    return {
        score: roundedScore,
        gradeLevel: gradeDisplay,
        letters,
        words,
        sentences,
    };
};
