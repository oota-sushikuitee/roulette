'use client';

import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('isDarkMode');
    if (storedDarkMode !== null) {
      setIsDarkMode(storedDarkMode === 'true');
    } else {
      const prefersDarkMode =
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDarkMode);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('isDarkMode', isDarkMode.toString());
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          シンプルルーレット
        </h1>

        <div className="flex items-center">
          {/* テーマ切り替えボタン */}
          <button
            onClick={toggleDarkMode}
            className="mr-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label={
              isDarkMode ? 'ライトモードに切り替え' : 'ダークモードに切り替え'
            }
          >
            {isDarkMode ? (
              <svg
                className="w-5 h-5 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 text-gray-700"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>

          {/* モバイルメニューボタン */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <svg
              className="w-6 h-6 text-gray-700 dark:text-gray-300"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>

          {/* デスクトップメニュー */}
          <nav className="hidden md:flex space-x-4">
            <a
              href="https://github.com/oota-sushikuitee/roulette"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
            >
              GitHub
            </a>
          </nav>
        </div>
      </div>

      {/* モバイルメニュー */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <nav className="px-4 py-2">
            <a
              href="https://github.com/oota-sushikuitee/roulette"
              target="_blank"
              rel="noopener noreferrer"
              className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
            >
              GitHub
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
