import React from 'react';

interface Settings {
  wpm: number;
  frequency: number;
}

interface MorseSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: Settings;
  onSettingsChange: (newSettings: Settings) => void;
}

const MorseSettingsModal: React.FC<MorseSettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSettingsChange,
}) => {
  if (!isOpen) {
    return null;
  }

  const handleWpmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({ ...settings, wpm: parseInt(e.target.value, 10) });
  };

  const handleFrequencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({ ...settings, frequency: parseInt(e.target.value, 10) });
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-title"
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-md m-4 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 id="settings-title" className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Audio Settings
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            aria-label="Close settings"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="wpm-slider" className="font-semibold text-gray-700 dark:text-gray-300">
                Speed (WPM)
              </label>
              <span className="text-lg font-mono text-purple-600 dark:text-purple-400">
                {settings.wpm}
              </span>
            </div>
            <input
              id="wpm-slider"
              type="range"
              min="5"
              max="40"
              step="1"
              value={settings.wpm}
              onChange={handleWpmChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              style={{ accentColor: 'rgb(168 85 247)' }}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="frequency-slider" className="font-semibold text-gray-700 dark:text-gray-300">
                Tone Frequency (Hz)
              </label>
              <span className="text-lg font-mono text-purple-600 dark:text-purple-400">
                {settings.frequency}
              </span>
            </div>
            <input
              id="frequency-slider"
              type="range"
              min="300"
              max="1000"
              step="10"
              value={settings.frequency}
              onChange={handleFrequencyChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
               style={{ accentColor: 'rgb(168 85 247)' }}
            />
          </div>
        </div>

        <div className="mt-8 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2 font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default MorseSettingsModal;
