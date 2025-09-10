export const removeExtraSpaces = (text: string): string => {
  // Replace multiple spaces with a single space, and trim leading/trailing spaces.
  return text.replace(/\s+/g, ' ').trim();
};

export const removeAllSpaces = (text: string): string => {
  // Removes all whitespace characters (spaces, tabs, newlines).
  return text.replace(/\s/g, '');
};

export const removeLineBreaks = (text: string): string => {
  // Replace newline characters with a space, then clean up any resulting double spaces.
  return text.replace(/(\r\n|\n|\r)/gm, ' ').replace(/\s+/g, ' ').trim();
};

export const trimLines = (text: string): string => {
  // Trim leading and trailing whitespace from each line.
  return text.split(/\r?\n/).map(line => line.trim()).join('\n');
};