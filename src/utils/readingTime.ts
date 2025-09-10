export interface ReadingTimeResult {
  wordCount: number;
  readingTime: string;
}

export const calculateReadingTime = (text: string, wpm: number): ReadingTimeResult => {
  const trimmedText = text.trim();
  
  if (trimmedText === '') {
    return {
      wordCount: 0,
      readingTime: '0 min 0 sec',
    };
  }
  
  const words = trimmedText.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  
  if (wordCount === 0) {
    return {
      wordCount: 0,
      readingTime: '0 min 0 sec',
    };
  }

  const minutesDecimal = wordCount / wpm;
  const totalSeconds = minutesDecimal * 60;

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.round(totalSeconds % 60);

  return {
    wordCount,
    readingTime: `${minutes} min ${seconds} sec`,
  };
};