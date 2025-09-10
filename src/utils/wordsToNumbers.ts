const numberWords: { [key: string]: { value: number, scale: number } } = {
    'zero': { value: 0, scale: 0 }, 'one': { value: 1, scale: 0 }, 'two': { value: 2, scale: 0 }, 'three': { value: 3, scale: 0 }, 'four': { value: 4, scale: 0 }, 'five': { value: 5, scale: 0 }, 'six': { value: 6, scale: 0 }, 'seven': { value: 7, scale: 0 }, 'eight': { value: 8, scale: 0 }, 'nine': { value: 9, scale: 0 },
    'ten': { value: 10, scale: 0 }, 'eleven': { value: 11, scale: 0 }, 'twelve': { value: 12, scale: 0 }, 'thirteen': { value: 13, scale: 0 }, 'fourteen': { value: 14, scale: 0 }, 'fifteen': { value: 15, scale: 0 }, 'sixteen': { value: 16, scale: 0 }, 'seventeen': { value: 17, scale: 0 }, 'eighteen': { value: 18, scale: 0 }, 'nineteen': { value: 19, scale: 0 },
    'twenty': { value: 20, scale: 0 }, 'thirty': { value: 30, scale: 0 }, 'forty': { value: 40, scale: 0 }, 'fifty': { value: 50, scale: 0 }, 'sixty': { value: 60, scale: 0 }, 'seventy': { value: 70, scale: 0 }, 'eighty': { value: 80, scale: 0 }, 'ninety': { value: 90, scale: 0 },
    'hundred': { value: 100, scale: 2 },
    'thousand': { value: 1000, scale: 3 },
    'million': { value: 1000000, scale: 6 },
    'billion': { value: 1000000000, scale: 9 },
    'trillion': { value: 1000000000000, scale: 12 },
    'quadrillion': { value: 1000000000000000, scale: 15 },
    'quintillion': { value: 1000000000000000000, scale: 18 },
};

const parseDecimal = (decimalStr: string): string => {
    const decimalWords = decimalStr.split(/\s+/).filter(Boolean);
    let decimalResult = '';
    for (const digitWord of decimalWords) {
        const numInfo = numberWords[digitWord];
        if (numInfo && numInfo.value < 10) {
            decimalResult += numInfo.value;
        } else {
            return `Error: Invalid word "${digitWord}" after "point"`;
        }
    }
    return decimalResult;
};

export const convertWordsToNumbers = (text: string): string => {
    if (!text || text.trim() === '') return '';

    const cleanText = text.toLowerCase().replace(/,/g, '').replace(/-/g, ' ').replace(/\band\b/g, '').trim();

    const parts = cleanText.split(/\bpoint\b/);
    const integerPartStr = parts[0].trim();
    const decimalPartStr = parts.length > 1 ? parts.slice(1).join(' ').trim() : null;

    if (integerPartStr === 'zero') {
        const decimalNum = decimalPartStr ? parseDecimal(decimalPartStr) : '';
        if (decimalNum.startsWith('Error:')) return decimalNum;
        return '0' + (decimalNum ? '.' + decimalNum : '');
    }
    
    if (!integerPartStr && !decimalPartStr) return '';

    const words = integerPartStr.split(/\s+/).filter(Boolean);
    
    let finalResult = 0;
    let currentResult = 0;

    for (const word of words) {
        const numInfo = numberWords[word];
        if (!numInfo) {
            return `Error: Unrecognized word "${word}"`;
        }

        if (numInfo.scale > 0) {
            if (numInfo.scale === 2) { // hundred
                currentResult *= numInfo.value;
            } else { // thousand, million...
                currentResult *= numInfo.value;
                finalResult += currentResult;
                currentResult = 0;
            }
        } else {
            currentResult += numInfo.value;
        }
    }
    
    finalResult += currentResult;
    
    let resultString = finalResult > 0 ? String(finalResult) : '';

    if (decimalPartStr) {
         const decimalNum = parseDecimal(decimalPartStr);
         if (decimalNum.startsWith('Error:')) return decimalNum;
         if (resultString === '') resultString = '0';
         resultString += '.' + decimalNum;
    }

    return resultString;
};