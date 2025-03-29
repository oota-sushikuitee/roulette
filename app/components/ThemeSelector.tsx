'use client';

import React, { useState, useEffect } from 'react';

// テーマの型定義
export type Theme = {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  bgColor: string;
  textColor: string;
};

// 利用可能なテーマ
const availableThemes: Theme[] = [
  {
    id: 'default',
    name: 'デフォルト',
    primaryColor:
      'bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800',
    secondaryColor: 'bg-gray-200 dark:bg-gray-700',
    accentColor: 'bg-green-100 dark:bg-green-900',
    bgColor: 'bg-gray-100 dark:bg-gray-900',
    textColor: 'text-gray-900 dark:text-gray-100',
  },
  {
    id: 'purple',
    name: 'パープル',
    primaryColor:
      'bg-purple-500 hover:bg-purple-600 dark:bg-purple-700 dark:hover:bg-purple-800',
    secondaryColor: 'bg-gray-200 dark:bg-gray-700',
    accentColor: 'bg-purple-100 dark:bg-purple-900',
    bgColor: 'bg-gray-100 dark:bg-gray-900',
    textColor: 'text-gray-900 dark:text-gray-100',
  },
  {
    id: 'green',
    name: 'グリーン',
    primaryColor:
      'bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-700 dark:hover:bg-emerald-800',
    secondaryColor: 'bg-gray-200 dark:bg-gray-700',
    accentColor: 'bg-emerald-100 dark:bg-emerald-900',
    bgColor: 'bg-gray-100 dark:bg-gray-900',
    textColor: 'text-gray-900 dark:text-gray-100',
  },
  {
    id: 'orange',
    name: 'オレンジ',
    primaryColor:
      'bg-orange-500 hover:bg-orange-600 dark:bg-orange-700 dark:hover:bg-orange-800',
    secondaryColor: 'bg-gray-200 dark:bg-gray-700',
    accentColor: 'bg-orange-100 dark:bg-orange-900',
    bgColor: 'bg-gray-100 dark:bg-gray-900',
    textColor: 'text-gray-900 dark:text-gray-100',
  },
];

type ThemeSelectorProps = {
  onThemeChange: (theme: Theme) => void;
};

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ onThemeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<Theme>(availableThemes[0]);

  // ローカルストレージからテーマを読み込む
  useEffect(() => {
    const savedThemeId = localStorage.getItem('selectedTheme');
    if (savedThemeId) {
      const theme = availableThemes.find((t) => t.id === savedThemeId);
      if (theme) {
        setCurrentTheme(theme);
        onThemeChange(theme);
      }
    }
  }, [onThemeChange]);

  const handleThemeSelect = (theme: Theme) => {
    setCurrentTheme(theme);
    onThemeChange(theme);
    localStorage.setItem('selectedTheme', theme.id);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm flex items-center"
      >
        <span className="mr-2">テーマ: {currentTheme.name}</span>
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 z-10">
          <div className="py-1">
            {availableThemes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => handleThemeSelect(theme)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  currentTheme.id === theme.id ? 'font-bold' : ''
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-4 h-4 rounded-full mr-2 ${theme.primaryColor.split(' ')[0]}`}
                  />
                  {theme.name}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;
export { availableThemes };
