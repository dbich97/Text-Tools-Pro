const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
const thousands = ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion'];

function convertChunk(num: number): string {
    if (num === 0) return '';
    if (num > 999) return 'Error: Chunk too large';

    const words = [];
    
    if (num >= 100) {
        words.push(ones[Math.floor(num / 100)], 'hundred');
        num %= 100;
    }
    
    if (num >= 20) {
        const ten = Math.floor(num / 10);
        const one = num % 10;
        if (one > 0) {
            words.push(tens[ten] + '-' + ones[one]);
        } else {
            words.push(tens[ten]);
        }
    } else if (num >= 10) {
        words.push(teens[num - 10]);
    } else if (num > 0) {
        words.push(ones[num]);
    }
    
    return words.join(' ');
}

export const convertNumberToWords = (input: string): string => {
    if (input === null || input.trim() === '') return '';
    input = input.trim().replace(/,/g, ''); // Remove commas

    if (!/^-?\d*\.?\d+$/.test(input)) {
        return 'Please enter a valid number.';
    }

    if (input === '0') return 'zero';

    let negativePrefix = '';
    if (input.startsWith('-')) {
        negativePrefix = 'negative ';
        input = input.substring(1);
    }
    
    const [integerPartStr, decimalPartStr] = input.split('.');
    
    // Safety check for very large numbers
    if (integerPartStr.length > thousands.length * 3) {
        return "Number is too large to convert.";
    }

    let integerWords = '';
    if (integerPartStr && integerPartStr !== '0') {
        const chunks = [];
        let tempStr = integerPartStr;
        while (tempStr.length > 0) {
            chunks.unshift(tempStr.slice(Math.max(0, tempStr.length - 3)));
            tempStr = tempStr.slice(0, -3);
        }

        integerWords = chunks.map((chunk, index) => {
            const chunkNum = parseInt(chunk, 10);
            if (chunkNum === 0) return '';
            const chunkWords = convertChunk(chunkNum);
            const thousandWord = thousands[chunks.length - 1 - index];
            return chunkWords + (thousandWord ? ' ' + thousandWord : '');
        }).filter(Boolean).join(' ');
    }

    let decimalWords = '';
    if (decimalPartStr) {
        decimalWords = 'point ' + decimalPartStr.split('').map(digit => ones[parseInt(digit)] || 'zero').join(' ');
    }

    if (!integerWords && decimalWords) {
        return (negativePrefix + 'zero ' + decimalWords).trim();
    }
    
    if (integerWords && decimalWords) {
        return (negativePrefix + integerWords + ' ' + decimalWords).trim();
    }

    return (negativePrefix + integerWords).trim();
};