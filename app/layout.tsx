'use client';

import './globals.css';
import React, { ReactNode } from 'react';
import Header from './components/Header';

interface Props {
  children: ReactNode;
}

const RootLayout = ({ children }: Props) => {
  return (
    <html lang="ja">
      <head>
        <title>シンプルルーレット</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="シンプルなルーレットアプリケーション"
        />
      </head>
      <body className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <footer className="text-center p-4 bg-gray-200 dark:bg-gray-800">
          <p>
            &copy;{' '}
            <a
              href="https://github.com/oota-sushikuitee"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              oota-sushikuitee
            </a>{' '}
            2024
          </p>
        </footer>
      </body>
    </html>
  );
};

export default RootLayout;
