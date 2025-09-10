export interface DiffResult {
  value: string;
  added?: boolean;
  removed?: boolean;
}

/**
 * A simplified text comparison (diff) implementation based on the
 * Longest Common Subsequence (LCS) algorithm. It is reasonably
 * performant for typical web use cases.
 * @param oldArr - An array of tokens from the original text.
 * @param newArr - An array of tokens from the new text.
 * @returns An array of DiffResult objects.
 */
function diff(oldArr: string[], newArr: string[]): DiffResult[] {
  // Use a map to store the indices of elements in the new array for quick lookup.
  const newIndices: { [key: string]: number[] } = {};
  newArr.forEach((item, index) => {
    if (!newIndices[item]) {
      newIndices[item] = [];
    }
    newIndices[item].push(index);
  });

  // Find the longest common subsequence using dynamic programming.
  // FIX: Changed 'overlap' from const to let to allow reassignment.
  let overlap: { [key: number]: number } = {};
  let startOld = 0;
  let startNew = 0;
  let subLength = 0;

  for (let i = 0; i < oldArr.length; i++) {
    const newOverlap: { [key: number]: number } = {};
    if (newIndices[oldArr[i]]) {
      newIndices[oldArr[i]].forEach(j => {
        newOverlap[j] = (overlap[j - 1] || 0) + 1;
        if (newOverlap[j] > subLength) {
          subLength = newOverlap[j];
          startOld = i - subLength + 1;
          startNew = j - subLength + 1;
        }
      });
    }
    overlap = newOverlap;
  }

  // If no common subsequence is found, mark old text as removed and new text as added.
  if (subLength === 0) {
    const result: DiffResult[] = [];
    if (oldArr.length > 0) result.push({ value: oldArr.join(''), removed: true });
    if (newArr.length > 0) result.push({ value: newArr.join(''), added: true });
    return result;
  }

  // Recursively find the diff of the text before and after the common subsequence.
  const prefix = diff(oldArr.slice(0, startOld), newArr.slice(0, startNew));
  const common = [{ value: newArr.slice(startNew, startNew + subLength).join('') }];
  const suffix = diff(oldArr.slice(startOld + subLength), newArr.slice(startNew + subLength));

  return [...prefix, ...common, ...suffix];
}

/**
 * Compares two strings and returns an array of objects representing the differences.
 * It tokenizes the strings by words and whitespace to provide a granular comparison.
 * @param oldStr - The original string.
 * @param newStr - The modified string.
 * @returns An array of DiffResult objects.
 */
export const diffWordsWithSpace = (oldStr: string, newStr: string): DiffResult[] => {
  // Tokenize by words and any whitespace characters (including newlines).
  // The capturing group in the regex ensures that delimiters (spaces) are also included in the result.
  const tokenize = (str: string) => str.split(/(\s+)/);
  
  const oldTokens = tokenize(oldStr);
  const newTokens = tokenize(newStr);
  
  const results = diff(oldTokens, newTokens);
  
  // Clean up the result by merging adjacent blocks of the same type (e.g., two 'added' blocks).
  const finalResult: DiffResult[] = [];
  if (results.length > 0) {
      finalResult.push(results[0]);
      for (let i = 1; i < results.length; i++) {
          const last = finalResult[finalResult.length - 1];
          const current = results[i];
          if (last.added && current.added) {
              last.value += current.value;
          } else if (last.removed && current.removed) {
              last.value += current.value;
          } else if (!last.added && !last.removed && !current.added && !current.removed) {
              last.value += current.value;
          } else {
              finalResult.push(current);
          }
      }
  }

  return finalResult;
};