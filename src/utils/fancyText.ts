// Helper function to create a transformer from a character map
const createTransformer = (charMap: Record<string, string>) => (text: string) => {
  return text.split('').map(char => charMap[char.toLowerCase()] || charMap[char.toUpperCase()] || char).join('');
};

// Helper function for combining characters
const createCombiningTransformer = (combiningChar: string) => (text: string) => {
  return text.split('').map(char => char + combiningChar).join('');
};

const charMaps = {
  bold: { 'a': '𝗮', 'b': '𝗯', 'c': '𝗰', 'd': '𝗱', 'e': '𝗲', 'f': '𝗳', 'g': '𝗴', 'h': '𝗵', 'i': '𝗶', 'j': '𝗷', 'k': '𝗸', 'l': '𝗹', 'm': '𝗺', 'n': '𝗻', 'o': '𝗼', 'p': '𝗽', 'q': '𝗾', 'r': '𝗿', 's': '𝘀', 't': '𝘁', 'u': '𝘂', 'v': '𝘃', 'w': '𝘄', 'x': '𝘅', 'y': '𝘆', 'z': '𝘇' },
  boldSerif: { 'a': '𝐁', 'b': '𝐁', 'c': '𝐂', 'd': '𝐃', 'e': '𝐄', 'f': '𝐅', 'g': '𝐆', 'h': '𝐇', 'i': '𝐈', 'j': '𝐉', 'k': '𝐊', 'l': '𝐋', 'm': '𝐌', 'n': '𝐍', 'o': '𝐎', 'p': '𝐏', 'q': '𝐐', 'r': '𝐑', 's': '𝐒', 't': '𝐓', 'u': '𝐔', 'v': '𝐕', 'w': '𝐖', 'x': '𝐗', 'y': '𝐘', 'z': '𝐙' },
  bubble: { 'a': 'ⓐ', 'b': 'ⓑ', 'c': 'ⓒ', 'd': 'ⓓ', 'e': 'ⓔ', 'f': 'ⓕ', 'g': 'ⓖ', 'h': 'ⓗ', 'i': 'ⓘ', 'j': 'ⓙ', 'k': 'ⓚ', 'l': 'ⓛ', 'm': 'ⓜ', 'n': 'ⓝ', 'o': 'ⓞ', 'p': 'ⓟ', 'q': 'ⓠ', 'r': 'ⓡ', 's': 'ⓢ', 't': 'ⓣ', 'u': 'ⓤ', 'v': 'ⓥ', 'w': 'ⓦ', 'x': 'ⓧ', 'y': 'ⓨ', 'z': 'ⓩ' },
  bubbleBlack: { 'a': '🅐', 'b': '🅑', 'c': '🅒', 'd': '🅓', 'e': '🅔', 'f': '🅕', 'g': '🅖', 'h': '🅗', 'i': '🅘', 'j': '🅙', 'k': '🅚', 'l': '🅛', 'm': '🅜', 'n': '🅝', 'o': '🅞', 'p': '🅟', 'q': '🅠', 'r': '🅡', 's': '🅢', 't': '🅣', 'u': '🅤', 'v': '🅥', 'w': '🅦', 'x': '🅧', 'y': '🅨', 'z': '🅩' },
  blackboard: { 'a': '𝕒', 'b': '𝕓', 'c': '𝕔', 'd': '𝕕', 'e': '𝕖', 'f': '𝕗', 'g': '𝕘', 'h': '𝕙', 'i': '𝕚', 'j': '𝕛', 'k': '𝕜', 'l': '𝕝', 'm': '𝕞', 'n': '𝕟', 'o': '𝕠', 'p': '𝕡', 'q': '𝕢', 'r': '𝕣', 's': '𝕤', 't': '𝕥', 'u': '𝕦', 'v': '𝕧', 'w': '𝕨', 'x': '𝕩', 'y': '𝕪', 'z': '𝕫' },
  emoji: { 'a': '🅰️', 'b': '🅱️', 'c': '☪️', 'd': '↩️', 'e': '📧', 'f': '🎏', 'g': '🌀', 'h': '♓️', 'i': 'ℹ️', 'j': '🗾', 'k': '🎋', 'l': '👢', 'm': 'Ⓜ️', 'n': '♑️', 'o': '🅾️', 'p': '🅿️', 'q': '🍳', 'r': '®️', 's': '💲', 't': '✝️', 'u': '⛎', 'v': '♈️', 'w': '〰️', 'x': '❌', 'y': '💹', 'z': '💤' },
  fraktur: { 'a': '𝔞', 'b': '𝔟', 'c': '𝔠', 'd': '𝔡', 'e': '𝔢', 'f': '𝔣', 'g': '𝔤', 'h': '𝔥', 'i': '𝔦', 'j': '𝔧', 'k': '𝔨', 'l': '𝔩', 'm': '𝔪', 'n': '𝔫', 'o': '𝔬', 'p': '𝔭', 'q': '𝔮', 'r': '𝔯', 's': '𝔰', 't': '𝔱', 'u': '𝔲', 'v': '𝔳', 'w': '𝔴', 'x': '𝔵', 'y': '𝔶', 'z': '𝔷' },
  frakturBold: { 'a': '𝕬', 'b': '𝕭', 'c': '𝕮', 'd': '𝕯', 'e': '𝕰', 'f': '𝕱', 'g': '𝕲', 'h': '𝕳', 'i': '𝕴', 'j': '𝕵', 'k': '𝕶', 'l': '𝕷', 'm': '𝕸', 'n': '𝕹', 'o': '𝕺', 'p': '𝕻', 'q': '𝕼', 'r': '𝕽', 's': '𝕾', 't': '𝕿', 'u': '𝖀', 'v': '𝖁', 'w': '𝖂', 'x': '𝖃', 'y': '𝖄', 'z': '𝖅' },
  wide: { 'a': 'ａ', 'b': 'ｂ', 'c': 'ｃ', 'd': 'ｄ', 'e': 'ｅ', 'f': 'ｆ', 'g': 'ｇ', 'h': 'ｈ', 'i': 'ｉ', 'j': 'ｊ', 'k': 'ｋ', 'l': 'ｌ', 'm': 'ｍ', 'n': 'ｎ', 'o': 'ｏ', 'p': 'ｐ', 'q': 'ｑ', 'r': 'ｒ', 's': 'ｓ', 't': 'ｔ', 'u': 'ｕ', 'v': 'ｖ', 'w': 'ｗ', 'x': 'ｘ', 'y': 'ｙ', 'z': 'ｚ' },
  handwriting: { 'a': '𝒶', 'b': '𝒷', 'c': '𝒸', 'd': '𝒹', 'e': '𝑒', 'f': '𝒻', 'g': '𝑔', 'h': '𝒽', 'i': '𝒾', 'j': '𝒿', 'k': '𝓀', 'l': '𝓁', 'm': '𝓂', 'n': '𝓃', 'o': '𝑜', 'p': '𝓅', 'q': '𝓆', 'r': '𝓇', 's': '𝓈', 't': '𝓉', 'u': '𝓊', 'v': '𝓋', 'w': '𝓌', 'x': '𝓍', 'y': '𝓎', 'z': '𝓏' },
  handwritingBold: { 'a': '𝓐', 'b': '𝓑', 'c': '𝓒', 'd': '𝓓', 'e': '𝓔', 'f': '𝓕', 'g': '𝓖', 'h': '𝓗', 'i': '𝓘', 'j': '𝓙', 'k': '𝓚', 'l': '𝓛', 'm': '𝓜', 'n': '𝓝', 'o': '𝓞', 'p': '𝓟', 'q': '𝓠', 'r': '𝓡', 's': '𝓢', 't': '𝓣', 'u': '𝓤', 'v': '𝓥', 'w': '𝓦', 'x': '𝓧', 'y': '𝓨', 'z': '𝓩' },
  italic: { 'a': '𝘢', 'b': '𝘣', 'c': '𝘤', 'd': '𝘥', 'e': '𝘦', 'f': '𝘧', 'g': '𝘨', 'h': '𝘩', 'i': '𝘪', 'j': '𝘫', 'k': '𝘬', 'l': '𝘭', 'm': '𝘮', 'n': '𝘯', 'o': '𝘰', 'p': '𝘱', 'q': '𝘲', 'r': '𝘳', 's': '𝘴', 't': '𝘵', 'u': '𝘶', 'v': '𝘷', 'w': '𝘸', 'x': '𝘹', 'y': '𝘺', 'z': '𝘻' },
  italicSerif: { 'a': '𝐼', 'b': '𝐵', 'c': '𝐶', 'd': '𝐷', 'e': '𝐸', 'f': '𝐹', 'g': '𝐺', 'h': '𝐻', 'i': '𝐼', 'j': '𝐽', 'k': '𝐾', 'l': '𝐿', 'm': '𝑀', 'n': '𝑁', 'o': '𝑂', 'p': '𝑃', 'q': '𝑄', 'r': '𝑅', 's': '𝑆', 't': '𝑇', 'u': '𝑈', 'v': '𝑉', 'w': '𝑊', 'x': '𝑋', 'y': '𝑌', 'z': '𝑍' },
  japanese: { 'a': 'ﾑ', 'b': '乃', 'c': 'ᄃ', 'd': 'り', 'e': '乇', 'f': 'ｷ', 'g': 'ム', 'h': 'ん', 'i': 'ﾉ', 'j': 'ﾌ', 'k': 'ズ', 'l': 'ﾚ', 'm': 'ﾶ', 'n': '刀', 'o': 'の', 'p': 'ｱ', 'q': 'ゐ', 'r': '尺', 's': '丂', 't': 'ｲ', 'u': '凵', 'v': 'リ', 'w': '山', 'x': 'ﾒ', 'y': 'ﾘ', 'z': '乙' },
  monospace: { 'a': '𝚊', 'b': '𝚋', 'c': '𝚌', 'd': '𝚍', 'e': '𝚎', 'f': '𝚏', 'g': '𝚐', 'h': '𝚑', 'i': '𝚒', 'j': '𝚓', 'k': '𝚔', 'l': '𝚕', 'm': '𝚖', 'n': '𝚗', 'o': '𝚘', 'p': '𝚙', 'q': '𝚚', 'r': '𝚛', 's': '𝚜', 't': '𝚝', 'u': '𝚞', 'v': '𝚟', 'w': '𝚠', 'x': '𝚡', 'y': '𝚢', 'z': '𝚣' },
  square: { 'a': '🄰', 'b': '🄱', 'c': '🄲', 'd': '🄳', 'e': '🄴', 'f': '🄵', 'g': '🄶', 'h': '🄷', 'i': '🄸', 'j': '🄹', 'k': '🄺', 'l': '🄻', 'm': '🄼', 'n': '🄽', 'o': '🄾', 'p': '🄿', 'q': '🅀', 'r': '🅁', 's': '🅂', 't': '🅃', 'u': '🅄', 'v': '🅅', 'w': '🅆', 'x': '🅇', 'y': '🅈', 'z': '🅉' },
  squareBlack: { 'a': '🅰', 'b': '🅱', 'c': '🅲', 'd': '🅳', 'e': '🅴', 'f': '🅵', 'g': '🅶', 'h': '🅷', 'i': '🅸', 'j': '🅹', 'k': '🅺', 'l': '🅻', 'm': '🅼', 'n': '🅽', 'o': '🅾', 'p': '🅿', 'q': '🆀', 'r': '🆁', 's': '🆂', 't': '🆃', 'u': '🆄', 'v': '🆅', 'w': '🆆', 'x': '🆇', 'y': '🆈', 'z': '🆉' },
  subscript: { 'a': 'ₐ', 'b': '♭', 'c': '꜀', 'd': 'ᑯ', 'e': 'ₑ', 'f': 'բ', 'g': '₉', 'h': 'ₕ', 'i': 'ᵢ', 'j': 'ⱼ', 'k': 'ₖ', 'l': 'ₗ', 'm': 'ₘ', 'n': 'ₙ', 'o': 'ₒ', 'p': 'ₚ', 'q': '૧', 'r': 'ᵣ', 's': 'ₛ', 't': 'ₜ', 'u': 'ᵤ', 'v': 'ᵥ', 'w': 'w', 'x': 'ₓ', 'y': 'ᵧ', 'z': '₂' },
  superscript: { 'a': 'ᵃ', 'b': 'ᵇ', 'c': 'ᶜ', 'd': 'ᵈ', 'e': 'ᵉ', 'f': 'ᶠ', 'g': 'ᵍ', 'h': 'ʰ', 'i': 'ⁱ', 'j': 'ʲ', 'k': 'ᵏ', 'l': 'ˡ', 'm': 'ᵐ', 'n': 'ⁿ', 'o': 'ᵒ', 'p': 'ᵖ', 'q': '۹', 'r': 'ʳ', 's': 'ˢ', 't': 'ᵗ', 'u': 'ᵘ', 'v': 'ᵛ', 'w': 'ʷ', 'x': 'ˣ', 'y': 'ʸ', 'z': 'ᶻ' },
  smallCaps: { 'a': 'ᴀ', 'b': 'ʙ', 'c': 'ᴄ', 'd': 'ᴅ', 'e': 'ᴇ', 'f': 'ꜰ', 'g': 'ɢ', 'h': 'ʜ', 'i': 'ɪ', 'j': 'ᴊ', 'k': 'ᴋ', 'l': 'ʟ', 'm': 'ᴍ', 'n': 'ɴ', 'o': 'ᴏ', 'p': 'ᴘ', 'q': 'ǫ', 'r': 'ʀ', 's': 'ꜱ', 't': 'ᴛ', 'u': 'ᴜ', 'v': 'ᴠ', 'w': 'ᴡ', 'x': 'x', 'y': 'ʏ', 'z': 'ᴢ' },
  mirror: { 'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ', 'g': 'ƃ', 'h': 'ɥ', 'i': 'ı', 'j': 'ɾ', 'k': 'ʞ', 'l': 'l', 'm': 'ɯ', 'n': 'u', 'o': 'o', 'p': 'd', 'q': 'b', 'r': 'ɹ', 's': 's', 't': 'ʇ', 'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'x': 'x', 'y': 'ʎ', 'z': 'z' },
  mixedSquareBubble: { 'a': '🄰', 'b': 'ⓑ', 'c': '🄲', 'd': 'ⓓ', 'e': '🄴', 'f': 'ⓕ', 'g': '🄶', 'h': 'ⓗ', 'i': '🄸', 'j': 'ⓙ', 'k': '🄺', 'l': 'ⓛ', 'm': '🄼', 'n': 'ⓝ', 'o': '🄾', 'p': 'ⓟ', 'q': '🅀', 'r': 'ⓡ', 's': '🅂', 't': 'ⓣ', 'u': '🅄', 'v': 'ⓥ', 'w': '🅆', 'x': 'ⓧ', 'y': '🅈', 'z': 'ⓩ' },
  mixedSquareBubbleBlack: { 'a': '🅰', 'b': '🅑', 'c': '🅲', 'd': '🅓', 'e': '🅴', 'f': '🅕', 'g': '🅶', 'h': '🅗', 'i': '🅸', 'j': '🅙', 'k': '🅺', 'l': '🅛', 'm': '🅼', 'n': '🅽', 'o': '🅾', 'p': '🅿', 'q': '🆀', 'r': '🆁', 's': '🆂', 't': '🆃', 'u': '🆄', 'v': '🆅', 'w': '🆆', 'x': '🆇', 'y': '🆈', 'z': '🆉' },
};

const randomizers = [
    createTransformer(charMaps.blackboard),
    createTransformer(charMaps.fraktur),
    createTransformer(charMaps.monospace),
    createTransformer(charMaps.boldSerif),
    createTransformer(charMaps.handwriting),
];

const createRandomTransformer = () => (text: string) => {
    return text.split('').map(char => {
        const randomStyleFunc = randomizers[Math.floor(Math.random() * randomizers.length)];
        return randomStyleFunc(char);
    }).join('');
};

export const styles = [
  { name: 'Bold (Serif)', transform: createTransformer(charMaps.boldSerif) },
  { name: 'Bold (Sans)', transform: createTransformer(charMaps.bold) },
  { name: 'Italic (Serif)', transform: createTransformer(charMaps.italicSerif) },
  { name: 'Italic (Sans)', transform: createTransformer(charMaps.italic) },
  { name: 'Handwriting', transform: createTransformer(charMaps.handwriting) },
  { name: 'Handwriting (Bold)', transform: createTransformer(charMaps.handwritingBold) },
  { name: 'Blackboard', transform: createTransformer(charMaps.blackboard) },
  { name: 'Fraktur', transform: createTransformer(charMaps.fraktur) },
  { name: 'Fraktur (Bold)', transform: createTransformer(charMaps.frakturBold) },
  { name: 'Monospace', transform: createTransformer(charMaps.monospace) },
  { name: 'Small Caps', transform: createTransformer(charMaps.smallCaps) },
  { name: 'Bubble', transform: createTransformer(charMaps.bubble) },
  { name: 'Bubble (Black)', transform: createTransformer(charMaps.bubbleBlack) },
  { name: 'Square', transform: createTransformer(charMaps.square) },
  { name: 'Square (Black)', transform: createTransformer(charMaps.squareBlack) },
  { name: 'Mixed Square/Bubble', transform: createTransformer(charMaps.mixedSquareBubble) },
  { name: 'Mixed Square/Bubble (Black)', transform: createTransformer(charMaps.mixedSquareBubbleBlack) },
  { name: 'Wide', transform: createTransformer(charMaps.wide) },
  { name: 'Mirror', transform: (text: string) => createTransformer(charMaps.mirror)(text.split('').reverse().join('')) },
  { name: 'Subscript', transform: createTransformer(charMaps.subscript) },
  { name: 'Superscript', transform: createTransformer(charMaps.superscript) },
  { name: 'Overline', transform: createCombiningTransformer('\u0305') },
  { name: 'Underline', transform: createCombiningTransformer('\u0332') },
  { name: 'Double Underline', transform: createCombiningTransformer('\u0333') },
  { name: 'Strikethrough', transform: createCombiningTransformer('\u0336') },
  { name: 'Double Strikethrough', transform: createCombiningTransformer('\u0337') },
  { name: 'Slashthrough', transform: createCombiningTransformer('\u0338') },
  { name: 'Zigzag', transform: createCombiningTransformer('\u035b') },
  { name: 'Arrow', transform: createCombiningTransformer('\u0355') },
  { name: 'Asterisk', transform: createCombiningTransformer('\u0359') },
  { name: 'Circle', transform: createCombiningTransformer('\u030A') },
  { name: 'Triangle', transform: createCombiningTransformer('\u20e4') },
  { name: 'Japanese', transform: createTransformer(charMaps.japanese) },
  { name: 'Emoji', transform: createTransformer(charMaps.emoji) },
  { name: 'Random (Style 1)', transform: createRandomTransformer() },
  { name: 'Random (Style 2)', transform: createRandomTransformer() },
];
