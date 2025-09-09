// FIX: Removed an unused and incorrect import of 'AbjadCalculator'.
export type GematriaSystem = 'english_simple' | 'transliterated_hebrew' | 'english_qaballa' | 'hebrew' | 'greek';

export const systemLabels: Record<GematriaSystem, string> = {
  'english_simple': 'English Simple (A=1, B=2...)',
  'transliterated_hebrew': 'Transliterated Hebrew',
  'english_qaballa': 'English Qaballa (ALW)',
  'hebrew': 'Hebrew',
  'greek': 'Greek (Isopsephy)',
};


interface GematriaResult {
  totalValue: number;
  breakdown: { char: string; value: number }[];
}

// --- CHARACTER MAPS ---

const simpleGematriaMap: { [key: string]: number } = {};
for(let i = 0; i < 26; i++){
    simpleGematriaMap[String.fromCharCode(97 + i)] = i + 1;
}

const transliteratedHebrewMap: { [key: string]: number } = {
  'a': 1, 'b': 2, 'g': 3, 'd': 4, 'h': 5, 'v': 6, 'w': 6, 'z': 7, 'ch': 8, 't': 9,
  'i': 10, 'y': 10, 'k': 20, 'l': 30, 'm': 40, 'n': 50, 's': 60, 'o': 70, 'p': 80,
  'tz': 90, 'q': 100, 'r': 200, 'sh': 300, 'th': 400,
  // Final forms for consistency, though less common in transliteration
  'kh': 20, 'mh': 40, 'nh': 50, 'ph': 80, 'tzh': 90,
};

const englishQaballaMap: { [key: string]: number } = {
  'a': 1, 'l': 2, 'w': 3, 'h': 4, 's': 5, 'd': 6, 'o': 7, 'z': 8, 'k': 9, 'v': 10,
  'g': 11, 'r': 12, 'c': 13, 'n': 14, 'y': 15, 'j': 16, 'u': 17, 'f': 18, 'q': 19,
  'b': 20, 'm': 21, 'x': 22, 'i': 23, 't': 24, 'e': 25, 'p': 26,
};

const hebrewMap: { [key: string]: number } = {
  'א': 1, 'ב': 2, 'ג': 3, 'ד': 4, 'ה': 5, 'ו': 6, 'ז': 7, 'ח': 8, 'ט': 9,
  'י': 10, 'כ': 20, 'ך': 20, 'ל': 30, 'מ': 40, 'ם': 40, 'נ': 50, 'ן': 50,
  'ס': 60, 'ע': 70, 'פ': 80, 'ף': 80, 'צ': 90, 'ץ': 90, 'ק': 100,
  'ר': 200, 'ש': 300, 'ת': 400,
};

const greekMap: { [key: string]: number } = {
  'α': 1, 'β': 2, 'γ': 3, 'δ': 4, 'ε': 5, 'ϛ': 6, 'ζ': 7, 'η': 8, 'θ': 9,
  'ι': 10, 'κ': 20, 'λ': 30, 'μ': 40, 'ν': 50, 'ξ': 60, 'ο': 70, 'π': 80, 'ϟ': 90,
  'ρ': 100, 'σ': 200, 'τ': 300, 'υ': 400, 'φ': 500, 'χ': 600, 'ψ': 700, 'ω': 800, 'ϡ': 900,
  // Uppercase variants
  'Α': 1, 'Β': 2, 'Γ': 3, 'Δ': 4, 'Ε': 5, 'ΣΤ': 6, 'Ζ': 7, 'Η': 8, 'Θ': 9,
  'Ι': 10, 'Κ': 20, 'Λ': 30, 'Μ': 40, 'Ν': 50, 'Ξ': 60, 'Ο': 70, 'Π': 80,
  'Ρ': 100, 'Σ': 200, 'Τ': 300, 'Υ': 400, 'Φ': 500, 'Χ': 600, 'Ψ': 700, 'Ω': 800,
};

// --- CALCULATION LOGIC ---

export const calculateGematria = (text: string, system: GematriaSystem): GematriaResult => {
  if (!text) {
    return { totalValue: 0, breakdown: [] };
  }

  let totalValue = 0;
  const breakdown: { char: string; value: number }[] = [];

  const charMap: { [key: string]: number } = ((): { [key: string]: number } => {
    switch (system) {
      case 'english_simple': return simpleGematriaMap;
      case 'transliterated_hebrew': return transliteratedHebrewMap;
      case 'english_qaballa': return englishQaballaMap;
      case 'hebrew': return hebrewMap;
      case 'greek': return greekMap;
      default: return {};
    }
  })();
  
  // Special handling for systems with multi-character keys (digraphs)
  if (system === 'transliterated_hebrew') {
    const lowerText = text.toLowerCase();
    let i = 0;
    while (i < lowerText.length) {
      // Check for 2-character keys first
      const twoChar = lowerText.substring(i, i + 2);
      if (charMap[twoChar]) {
        totalValue += charMap[twoChar];
        breakdown.push({ char: text.substring(i, i + 2), value: charMap[twoChar] });
        i += 2;
        continue;
      }
      // Check for 1-character keys
      const oneChar = lowerText[i];
      if (charMap[oneChar]) {
        totalValue += charMap[oneChar];
        breakdown.push({ char: text[i], value: charMap[oneChar] });
      }
      i += 1;
    }
  } else {
    // Standard loop for single-character systems
    for (const char of text) {
      const lookupChar = system === 'english_simple' || system === 'english_qaballa' ? char.toLowerCase() : char;
      const value = charMap[lookupChar];
      if (value !== undefined) {
        totalValue += value;
        breakdown.push({ char: char, value });
      }
    }
  }

  return { totalValue, breakdown };
};