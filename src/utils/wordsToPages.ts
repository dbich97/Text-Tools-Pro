export type FontOption = 'Arial' | 'Times New Roman' | 'Calibri' | 'Verdana';
export type FontSizeOption = '10' | '11' | '12';
export type SpacingOption = 'single' | 'oneAndHalf' | 'double';

export interface WordsToPagesOptions {
  font: FontOption;
  fontSize: FontSizeOption;
  spacing: SpacingOption;
}

// These are standard industry estimates for words per page (WPP) on an 8.5" x 11" page with 1" margins.
const WORDS_PER_PAGE_ESTIMATES: Record<FontOption, Record<FontSizeOption, Record<SpacingOption, number>>> = {
  'Arial': {
    '10': { 'single': 600, 'oneAndHalf': 400, 'double': 300 },
    '11': { 'single': 550, 'oneAndHalf': 367, 'double': 275 },
    '12': { 'single': 500, 'oneAndHalf': 333, 'double': 250 },
  },
  'Times New Roman': {
    '10': { 'single': 580, 'oneAndHalf': 387, 'double': 290 },
    '11': { 'single': 530, 'oneAndHalf': 353, 'double': 265 },
    '12': { 'single': 500, 'oneAndHalf': 333, 'double': 250 },
  },
  'Calibri': {
    '10': { 'single': 630, 'oneAndHalf': 420, 'double': 315 },
    '11': { 'single': 580, 'oneAndHalf': 387, 'double': 290 },
    '12': { 'single': 530, 'oneAndHalf': 353, 'double': 265 },
  },
  'Verdana': {
    '10': { 'single': 540, 'oneAndHalf': 360, 'double': 270 },
    '11': { 'single': 490, 'oneAndHalf': 327, 'double': 245 },
    '12': { 'single': 450, 'oneAndHalf': 300, 'double': 225 },
  },
};

export const calculateWordsToPages = (wordCount: number, options: WordsToPagesOptions): string => {
  if (isNaN(wordCount) || wordCount < 0) {
    return '0.0';
  }

  const wpp = WORDS_PER_PAGE_ESTIMATES[options.font][options.fontSize][options.spacing];
  
  if (!wpp) {
    // Fallback to a default if somehow an invalid option is passed
    return 'N/A';
  }

  if (wordCount === 0) {
      return '0.0';
  }

  const pages = wordCount / wpp;
  
  // Return with one decimal place for better estimation.
  return pages.toFixed(1);
};