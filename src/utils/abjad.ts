interface AbjadResult {
  totalValue: number;
  breakdown: { char: string; value: number }[];
}

const abjadMap: { [key: string]: number } = {
  'ا': 1, 'أ': 1, 'إ': 1, 'آ': 1, // Alif variants
  'ب': 2,
  'ج': 3,
  'د': 4,
  'ه': 5, 'ة': 5, // Ha and Ta marbuta
  'و': 6,
  'ز': 7,
  'ح': 8,
  'ط': 9,
  'ي': 10, 'ى': 10, // Ya and Alif maqsura
  'ك': 20,
  'ل': 30,
  'م': 40,
  'ن': 50,
  'س': 60,
  'ع': 70,
  'ف': 80,
  'ص': 90,
  'ق': 100,
  'ر': 200,
  'ش': 300,
  'ت': 400,
  'ث': 500,
  'خ': 600,
  'ذ': 700,
  'ض': 800,
  'ظ': 900,
  'غ': 1000,
};

export const calculateAbjad = (text: string): AbjadResult => {
  if (!text) {
    return { totalValue: 0, breakdown: [] };
  }

  let totalValue = 0;
  const breakdown: { char: string; value: number }[] = [];

  for (const char of text) {
    const value = abjadMap[char];
    if (value !== undefined) {
      totalValue += value;
      breakdown.push({ char, value });
    }
  }

  return { totalValue, breakdown };
};