export interface AlphabetizerOptions {
  order: 'asc' | 'desc';
  caseSensitive: boolean;
  removeDuplicates: boolean;
}

export const alphabetize = (text: string, options: AlphabetizerOptions): string => {
  if (!text.trim()) {
    return '';
  }

  let lines = text.split(/\r?\n/);

  if (options.removeDuplicates) {
    const seen = new Set<string>();
    const uniqueLines: string[] = [];
    for (const line of lines) {
      const key = options.caseSensitive ? line : line.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        uniqueLines.push(line);
      }
    }
    lines = uniqueLines;
  }

  lines.sort((a, b) => {
    // Treat empty lines as lowest value
    if (a.trim() === '' && b.trim() !== '') return -1;
    if (a.trim() !== '' && b.trim() === '') return 1;

    const valA = options.caseSensitive ? a : a.toLowerCase();
    const valB = options.caseSensitive ? b : b.toLowerCase();

    if (valA < valB) {
      return options.order === 'asc' ? -1 : 1;
    }
    if (valA > valB) {
      return options.order === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return lines.join('\n');
};