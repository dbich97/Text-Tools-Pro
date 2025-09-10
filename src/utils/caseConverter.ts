export const toSentenceCase = (text: string): string => {
  if (!text) return '';
  return text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
};

export const toLowerCase = (text: string): string => {
  return text.toLowerCase();
};

export const toUpperCase = (text: string): string => {
  return text.toUpperCase();
};

export const toCapitalizedCase = (text: string): string => {
  return text.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
};

export const toTitleCase = (text: string): string => {
  if (!text) return '';
  const smallWords = new Set(['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'in', 'of', 'on', 'or', 'the', 'to', 'up']);

  const words = text.split(' ');
  return words.map((word, index) => {
    if (word.trim() === '') return word;

    const lowerWord = word.toLowerCase();
    // A simple way to check is to clean the word of surrounding punctuation.
    const cleanWord = lowerWord.replace(/^[^\w]+|[^\w]+$/g, ''); 

    // Always capitalize the first and last words of the phrase.
    if (index === 0 || index === words.length - 1 || !smallWords.has(cleanWord)) {
      // Find the first alphabetical character and capitalize it.
      let firstCharIndex = -1;
      for (let i = 0; i < lowerWord.length; i++) {
        if (lowerWord[i].match(/[a-z]/i)) {
          firstCharIndex = i;
          break;
        }
      }

      if (firstCharIndex !== -1) {
        return lowerWord.substring(0, firstCharIndex) +
               lowerWord.charAt(firstCharIndex).toUpperCase() +
               lowerWord.substring(firstCharIndex + 1);
      }
    }
    return lowerWord;
  }).join(' ');
};

export const toAlternatingCase = (text: string): string => {
  let result = '';
  let capitalize = true;
  for (const char of text) {
    if (/[a-zA-Z]/.test(char)) {
      result += capitalize ? char.toUpperCase() : char.toLowerCase();
      capitalize = !capitalize;
    } else {
      result += char;
    }
  }
  return result;
};

export const toInverseCase = (text: string): string => {
  let result = '';
  for (const char of text) {
    if (char === char.toUpperCase()) {
      result += char.toLowerCase();
    } else {
      result += char.toUpperCase();
    }
  }
  return result;
};