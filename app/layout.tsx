'use client';

import './globals.css';
import React, { ReactNode, useState, useEffect } from 'react';

interface Props {
  children: ReactNode;
}

const RootLayout = ({ children }: Props) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

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
  }, [isDarkMode]);

  return (
    <html lang="en">
      <head>
        <title>Simple Roulette</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
