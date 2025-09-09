// --- Morse Code Maps ---
export const CHAR_TO_MORSE: { [key: string]: string } = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--', 'Z': '--..',
  '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----',
  '.': '.-.-.-', ',': '--..--', '?': '..--..', '\'': '.----.', '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-', '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-', '_': '..--.-', '"': '.-..-.', '$': '...-..-', '@': '.--.-.',
  ' ': '/'
};

// Create the reverse map for decoding
export const MORSE_TO_CHAR: { [key: string]: string } = {};
for (const char in CHAR_TO_MORSE) {
  const morse = CHAR_TO_MORSE[char];
  MORSE_TO_CHAR[morse] = char;
}

// --- Conversion Functions ---
export const textToMorse = (text: string): string => {
  return text.toUpperCase().split('').map(char => CHAR_TO_MORSE[char] || '').join(' ').trim().replace(/ +/g, ' ');
};

export const morseToText = (morse: string): string => {
    // Handle word spaces (/) and letter spaces
    return morse.trim().split(' / ').map(word =>
        word.split(' ').map(letter => MORSE_TO_CHAR[letter] || '').join('')
    ).join(' ');
};

// --- Audio Playback Logic ---
let audioContext: AudioContext | null = null;
let isPlayingGlobal = false;
let globalGainNode: GainNode | null = null;

const getAudioContext = (): AudioContext => {
  if (!audioContext || audioContext.state === 'closed') {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
};

const getUnitDuration = (wpm: number) => 1.2 / wpm; // Paris standard for dot duration

export const playMorseCode = async (morseCode: string, wpm: number, frequency: number): Promise<void> => {
  if (isPlayingGlobal || !morseCode) return;
  isPlayingGlobal = true;

  try {
    const context = getAudioContext();
    if (context.state === 'suspended') {
      await context.resume();
    }

    const unit = getUnitDuration(wpm);
    const dotDuration = unit;
    const dashDuration = unit * 3;
    const intraLetterPause = unit;
    const interLetterPause = unit * 3;
    const interWordPause = unit * 7;

    const playTone = (duration: number): Promise<void> => {
      return new Promise(resolve => {
        if (!isPlayingGlobal) {
            resolve();
            return;
        }
        const oscillator = context.createOscillator();
        const gainNode = context.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, context.currentTime);
        gainNode.gain.setValueAtTime(0, context.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.5, context.currentTime + 0.01); // Quick fade in
        gainNode.gain.linearRampToValueAtTime(0, context.currentTime + duration - 0.01); // Quick fade out

        oscillator.connect(gainNode);
        gainNode.connect(context.destination);
        globalGainNode = gainNode;

        oscillator.start();
        oscillator.onended = () => resolve();
        oscillator.stop(context.currentTime + duration);
      });
    };

    const pause = (duration: number): Promise<void> => {
      return new Promise(resolve => setTimeout(resolve, duration * 1000));
    };
    
    const elements = morseCode.split('');
    for (let i = 0; i < elements.length; i++) {
        if (!isPlayingGlobal) break;
        const char = elements[i];
        
        switch (char) {
            case '.':
                await playTone(dotDuration);
                await pause(intraLetterPause);
                break;
            case '-':
                await playTone(dashDuration);
                await pause(intraLetterPause);
                break;
            case ' ':
                if (elements[i+1] === '/' && elements[i+2] === ' ') {
                    await pause(interWordPause - intraLetterPause);
                    i += 2; // Skip the / and the next space
                } else {
                    await pause(interLetterPause - intraLetterPause);
                }
                break;
        }
    }
  } finally {
    isPlayingGlobal = false;
    globalGainNode = null;
  }
};

export const stopMorseCode = () => {
    if (globalGainNode) {
        globalGainNode.gain.cancelScheduledValues(0);
        globalGainNode.gain.setValueAtTime(globalGainNode.gain.value, audioContext!.currentTime);
        globalGainNode.gain.linearRampToValueAtTime(0, audioContext!.currentTime + 0.01);
    }
    isPlayingGlobal = false;
};


// --- Audio Generation for Download ---

// Helper to convert an AudioBuffer to a WAV file Blob
const audioBufferToWav = (buffer: AudioBuffer): Blob => {
    const numOfChan = buffer.numberOfChannels;
    const a = buffer.getChannelData(0);
    const b = buffer.getChannelData(numOfChan > 1 ? 1 : 0);
    const length = a.length * numOfChan * 2 + 44;
    const data = new DataView(new ArrayBuffer(length));
    const sampleRate = buffer.sampleRate;
    
    let p = 0;
    const writeString = (s: string) => {
        for (let i = 0; i < s.length; i++) {
            data.setUint8(p++, s.charCodeAt(i));
        }
    };
    
    writeString('RIFF'); data.setUint32(p, length - 8, true); p += 4;
    writeString('WAVE');
    writeString('fmt '); data.setUint32(p, 16, true); p += 4;
    data.setUint16(p, 1, true); p += 2;
    data.setUint16(p, numOfChan, true); p += 2;
    data.setUint32(p, sampleRate, true); p += 4;
    data.setUint32(p, sampleRate * 2 * numOfChan, true); p += 4;
    data.setUint16(p, numOfChan * 2, true); p += 2;
    data.setUint16(p, 16, true); p += 2;
    writeString('data'); data.setUint32(p, length - p - 4, true); p += 4;
    
    for (let i = 0; i < a.length; i++) {
        data.setInt16(p, a[i] * 0x7FFF, true); p += 2;
        if (numOfChan > 1) {
            data.setInt16(p, b[i] * 0x7FFF, true); p += 2;
        }
    }
    
    return new Blob([data], { type: 'audio/wav' });
};

export const generateMorseAudioWav = async (morseCode: string, wpm: number, frequency: number): Promise<Blob> => {
    const unit = getUnitDuration(wpm);
    const timings: { duration: number; isTone: boolean }[] = [];
    let totalDuration = 0;
    
    const elements = morseCode.split('');
    for (let i = 0; i < elements.length; i++) {
        const char = elements[i];
        let duration = 0;
        let isTone = false;

        switch (char) {
            case '.': duration = unit; isTone = true; break;
            case '-': duration = unit * 3; isTone = true; break;
            case ' ':
                if (elements[i+1] === '/' && elements[i+2] === ' ') {
                    duration = unit * 7;
                    i += 2;
                } else {
                    duration = unit * 3;
                }
                isTone = false;
                break;
        }
        if (duration > 0) {
            timings.push({ duration, isTone });
            totalDuration += duration;
            // Add intra-letter pause after every tone
            if (isTone) {
                timings.push({ duration: unit, isTone: false });
                totalDuration += unit;
            }
        }
    }

    const offlineContext = new OfflineAudioContext(1, 44100 * totalDuration, 44100);
    const gainNode = offlineContext.createGain();
    gainNode.connect(offlineContext.destination);
    
    let currentTime = 0;
    for (const timing of timings) {
        if (timing.isTone) {
            const oscillator = offlineContext.createOscillator();
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(frequency, 0);
            oscillator.connect(gainNode);
            
            gainNode.gain.setValueAtTime(0, currentTime);
            gainNode.gain.linearRampToValueAtTime(0.5, currentTime + 0.01);
            gainNode.gain.linearRampToValueAtTime(0, currentTime + timing.duration - 0.01);
            
            oscillator.start(currentTime);
            oscillator.stop(currentTime + timing.duration);
        }
        currentTime += timing.duration;
    }

    const renderedBuffer = await offlineContext.startRendering();
    return audioBufferToWav(renderedBuffer);
};
