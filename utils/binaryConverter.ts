export type Format = 'Text' | 'Binary' | 'Decimal' | 'Hexadecimal' | 'Octal';

// --- Helper Functions ---
const isInvalidInput = (arr: number[]) => !arr || arr.length === 0 || arr.some(isNaN);

// --- Parsers (Input -> Array of char codes) ---
const textToCharCodes = (input: string): number[] => {
    return input.split('').map(char => char.charCodeAt(0));
};

const binaryToCharCodes = (input: string): number[] => {
    return input.trim().split(/\s+/).map(bin => parseInt(bin, 2));
};

const decimalToCharCodes = (input: string): number[] => {
    return input.trim().split(/\s+/).map(dec => parseInt(dec, 10));
};

const hexToCharCodes = (input: string): number[] => {
    return input.trim().split(/\s+/).map(hex => parseInt(hex, 16));
};

const octalToCharCodes = (input: string): number[] => {
    return input.trim().split(/\s+/).map(oct => parseInt(oct, 8));
};


// --- Formatters (Array of char codes -> String) ---
const charCodesToText = (codes: number[]): string => {
    try {
        return String.fromCharCode(...codes);
    } catch (e) {
        return 'Error: Invalid character code in sequence.';
    }
};

const charCodesToBinary = (codes: number[]): string => {
    return codes.map(code => code.toString(2).padStart(8, '0')).join(' ');
};

const charCodesToDecimal = (codes: number[]): string => {
    return codes.join(' ');
};

const charCodesToHex = (codes: number[]): string => {
    return codes.map(code => code.toString(16).toUpperCase()).join(' ');
};

const charCodesToOctal = (codes: number[]): string => {
    return codes.map(code => code.toString(8)).join(' ');
};


// --- Main Conversion Function ---
export const convert = (input: string, from: Format, to: Format): string => {
    if (!input) return '';
    if (from === to) return input;

    let charCodes: number[];

    switch (from) {
        case 'Text':
            charCodes = textToCharCodes(input);
            break;
        case 'Binary':
            charCodes = binaryToCharCodes(input);
            break;
        case 'Decimal':
            charCodes = decimalToCharCodes(input);
            break;
        case 'Hexadecimal':
            charCodes = hexToCharCodes(input);
            break;
        case 'Octal':
            charCodes = octalToCharCodes(input);
            break;
        default:
            return 'Invalid input format';
    }

    if (isInvalidInput(charCodes)) {
        return `Error: Invalid input for ${from} format.`;
    }

    switch (to) {
        case 'Text':
            return charCodesToText(charCodes);
        case 'Binary':
            return charCodesToBinary(charCodes);
        case 'Decimal':
            return charCodesToDecimal(charCodes);
        case 'Hexadecimal':
            return charCodesToHex(charCodes);
        case 'Octal':
            return charCodesToOctal(charCodes);
        default:
            return 'Invalid output format';
    }
};
