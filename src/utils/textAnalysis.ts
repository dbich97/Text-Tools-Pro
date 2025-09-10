const STOP_WORDS = new Set(['a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'can', 'did', 'do', 'does', 'doing', 'down', 'during', 'each', 'few', 'for', 'from', 'further', 'had', 'has', 'have', 'having', 'he', 'her', 'here', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'i', 'if', 'in', 'into', 'is', 'it', 'its', 'itself', 'just', 'me', 'more', 'most', 'my', 'myself', 'no', 'nor', 'not', 'now', 'of', 'off', 'on', 'once', 'only', 'or', 'other', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 's', 'same', 'she', 'should', 'so', 'some', 'such', 't', 'than', 'that', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'these', 'they', 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'we', 'were', 'what', 'when', 'where', 'which', 'while', 'who', 'whom', 'why', 'will', 'with', 'you', 'your', 'yours', 'yourself', 'yourselves']);

const formatTime = (count: number, wpm: number): string => {
    if (count === 0) return '0 min 0 sec';
    const minutesDecimal = count / wpm;
    const minutes = Math.floor(minutesDecimal);
    const seconds = Math.round((minutesDecimal - minutes) * 60);
    return `${minutes} min ${seconds} sec`;
};

export const analyzeText = (text: string) => {
    const trimmedText = text.trim();
    const charsWithSpaces = text.length;
    const charsWithoutSpaces = text.replace(/\s/g, '').length;
    
    if (trimmedText === '') {
        return { 
            stats: {
                charsWithSpaces,
                charsWithoutSpaces,
                wordCount: 0,
                sentences: 0,
                paragraphs: 0,
                uniqueWords: 0,
                readingTime: '0 min 0 sec',
                speechTime: '0 min 0 sec',
            },
            keywords: []
        };
    }
    
    const words = trimmedText.split(/\s+/).filter(Boolean);
    const wordCount = words.length;

    const sentences = trimmedText.split(/[.!?]+/).filter(Boolean).length || (wordCount > 0 ? 1 : 0);
    const paragraphs = trimmedText.split(/\n+/).filter(Boolean).length;

    const cleanedWordsForUnique = words.map(w => w.toLowerCase().replace(/[^a-z0-9]/g, ''));
    const uniqueWords = new Set(cleanedWordsForUnique.filter(Boolean)).size;

    const readingTime = formatTime(wordCount, 225); // Average reading speed
    const speechTime = formatTime(wordCount, 180); // Average speaking speed
    
    // Keyword Density Calculation
    const allWordsForKeywords = text.toLowerCase().match(/\b[a-z]+\b/g) || [];
    const totalKeywordCount = allWordsForKeywords.length;
    
    const wordFreq: { [key: string]: number } = {};
    if (totalKeywordCount > 0) {
        for (const word of allWordsForKeywords) {
            if (!STOP_WORDS.has(word)) {
                wordFreq[word] = (wordFreq[word] || 0) + 1;
            }
        }
    }

    const calculatedKeywords = Object.entries(wordFreq)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([word, count]) => ({
            text: word,
            count,
            density: totalKeywordCount > 0 ? ((count / totalKeywordCount) * 100).toFixed(2) + '%' : '0.00%'
        }));

    return {
        stats: {
            charsWithSpaces,
            charsWithoutSpaces,
            wordCount,
            sentences,
            paragraphs,
            uniqueWords,
            readingTime,
            speechTime,
        },
        keywords: calculatedKeywords
    };
};
