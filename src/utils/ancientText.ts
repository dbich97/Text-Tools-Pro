// Helper function to create a transformer from a character map
const createTransformer = (charMap: Record<string, string>) => (text: string) => {
  return text.split('').map(char => charMap[char.toLowerCase()] || char).join('');
};

const charMaps = {
  runic: { 'a': 'ᚨ', 'b': 'ᛒ', 'c': 'ᚲ', 'd': 'ᛞ', 'e': 'ᛖ', 'f': 'ᚠ', 'g': 'ᚷ', 'h': 'ᚺ', 'i': 'ᛁ', 'j': 'ᛃ', 'k': 'ᚲ', 'l': 'ᛚ', 'm': 'ᛗ', 'n': 'ᚾ', 'o': 'ᛟ', 'p': 'ᛈ', 'q': 'ᚲ', 'r': 'ᚱ', 's': 'ᛋ', 't': 'ᛏ', 'u': 'ᚢ', 'v': 'ᚹ', 'w': 'ᚹ', 'x': 'ᛪ', 'y': 'ᛃ', 'z': 'ᛉ' },
  ogham: { 'a': 'ᚐ', 'b': 'ᚁ', 'c': 'ᚉ', 'd': 'ᚇ', 'e': 'ᚓ', 'f': 'ᚃ', 'g': 'ᚌ', 'h': 'ᚆ', 'i': 'ᚔ', 'j': 'ᚌ', 'k': 'ᚊ', 'l': 'ᚂ', 'm': 'ᚋ', 'n': 'ᚅ', 'o': 'ᚑ', 'p': 'ᚘ', 'q': 'ᚊ', 'r': 'ᚏ', 's': 'ᚄ', 't': 'ᚈ', 'u': 'ᚒ', 'v': 'ᚃ', 'w': 'ᚃ', 'x': 'ᚆ', 'y': 'ᚔ', 'z': 'ᚄᚈ' },
  hieroglyph: { 'a': '𓄿', 'b': '𓃀', 'c': '𓎡', 'd': '𓂧', 'e': '𓇋', 'f': '𓆑', 'g': '𓎼', 'h': '𓉔', 'i': '𓇋', 'j': '𓆓', 'k': '𓎡', 'l': '𓃭', 'm': '𓅓', 'n': '𓈖', 'o': '𓍯', 'p': '𓊪', 'q': '𓈎', 'r': '𓂋', 's': '𓋴', 't': '𓏏', 'u': '𓅱', 'v': '𓆑', 'w': '𓅱', 'x': '𓎡𓋴', 'y': '𓇌', 'z': '𓊃' },
  phoenician: { 'a': '𐤀', 'b': '𐤁', 'c': '𐤂', 'd': '𐤃', 'e': '𐤄', 'f': '𐤅', 'g': '𐤂', 'h': '𐤇', 'i': '𐤉', 'j': '𐤉', 'k': '𐤊', 'l': '𐤋', 'm': '𐤌', 'n': '𐤍', 'o': '𐤏', 'p': '𐤐', 'q': '𐤒', 'r': '𐤓', 's': '𐤔', 't': '𐤕', 'u': '𐤅', 'v': '𐤅', 'w': '𐤅', 'x': '𐤎', 'y': '𐤉', 'z': '𐤆' },
};

export const styles = [
  { name: 'Runic (Futhark)', transform: createTransformer(charMaps.runic), description: 'Based on the ancient Germanic alphabets.' },
  { name: 'Ogham', transform: createTransformer(charMaps.ogham), description: 'An early medieval alphabet used to write the early Irish language.' },
  { name: 'Hieroglyphic', transform: createTransformer(charMaps.hieroglyph), description: 'A stylistic representation using Egyptian hieroglyphic characters.' },
  { name: 'Phoenician', transform: createTransformer(charMaps.phoenician), description: 'Characters from the ancient Phoenician alphabet, an ancestor to many modern scripts.' },
];