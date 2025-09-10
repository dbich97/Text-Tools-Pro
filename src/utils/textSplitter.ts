export const splitText = (text: string, separator: string): string => {
  if (!text) return '';
  // The separator can be multiple characters, so we handle that correctly.
  return text.split('').join(separator);
};