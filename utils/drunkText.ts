// Configuration for different levels of "drunkenness"
const config = {
    // level 1: Tipsy
    1: { typo: 0.05, doubleLetter: 0.02, caps: 0.0, punctuation: 0.05, filler: 0.02 },
    // level 2: Drunk
    2: { typo: 0.15, doubleLetter: 0.08, caps: 0.1, punctuation: 0.15, filler: 0.08 },
    // level 3: Very Drunk
    3: { typo: 0.25, doubleLetter: 0.15, caps: 0.2, punctuation: 0.25, filler: 0.15 },
    // level 4: Wasted
    4: { typo: 0.40, doubleLetter: 0.25, caps: 0.4, punctuation: 0.40, filler: 0.25 },
    // level 5: Completely Wasted
    5: { typo: 0.60, doubleLetter: 0.40, caps: 0.7, punctuation: 0.60, filler: 0.40 },
};

const fillers = ['lol', 'omg', 'like', 'uhm', 'sooo', 'haha', 'idk', '...', '!!'];
const punctuation = ['!', '?', '.', '!!', '???', '...'];

// Helper to get a random element from an array
const getRandom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const generateDrunkText = (text: string, level: 1 | 2 | 3 | 4 | 5): string => {
    if (!text.trim()) return '';

    const settings = config[level];
    const words = text.split(/(\s+)/); // Split by space but keep spaces
    let output = '';

    for (const word of words) {
        if (word.trim() === '') {
            output += word; // Keep whitespace as is
            continue;
        }

        let modifiedWord = '';
        for (let i = 0; i < word.length; i++) {
            let char = word[i];

            // 1. Random capitalization
            if (Math.random() < settings.caps) {
                char = Math.random() < 0.5 ? char.toUpperCase() : char.toLowerCase();
            }

            // 2. Add typos (swap with adjacent character)
            if (i < word.length - 1 && Math.random() < settings.typo) {
                modifiedWord += word[i + 1] + char;
                i++; // Skip next character
                continue;
            }
            
            // 3. Double letters
            if (Math.random() < settings.doubleLetter) {
                char += char;
            }

            modifiedWord += char;
        }

        // 4. Add/mess up punctuation at the end of words
        if (Math.random() < settings.punctuation) {
            const lastChar = modifiedWord.slice(-1);
            if (',.?!'.includes(lastChar)) {
                 // Replace existing punctuation
                 modifiedWord = modifiedWord.slice(0, -1) + getRandom(punctuation);
            } else {
                 // Add new punctuation
                 modifiedWord += getRandom(punctuation);
            }
        }
        
        output += modifiedWord;

        // 5. Add filler words
        if (Math.random() < settings.filler) {
             output += ` ${getRandom(fillers)}`;
        }
    }

    return output;
};