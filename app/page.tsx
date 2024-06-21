'use client';

import { useState } from 'react';
import { drawLots } from '../utils/drawLots';

const DrawLotsPage = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [removeWinner, setRemoveWinner] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleDraw = () => {
    const items = input.split('\n');
    const { winner, remainingItems } = drawLots(items, removeWinner);
    setResult(winner);
    setInput(remainingItems.join('\n'));
  };

  const handleToggle = () => {
    setRemoveWinner((prevState) => !prevState);
  };

  const hasItems =
    input.split('\n').filter((item) => item.trim() !== '').length > 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Simple Roulette</h1>
      <textarea
        rows={10}
        cols={30}
        value={input}
        onChange={handleChange}
        placeholder="Enter strings separated by new lines"
        className="w-full max-w-md p-2 border border-gray-300 dark:border-gray-700 rounded mb-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
      />
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={removeWinner}
          onChange={handleToggle}
          className="mr-2"
        />
        <label>Remove winner from the list</label>
      </div>
      <button
        onClick={handleDraw}
        disabled={!hasItems}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 dark:bg-blue-700 dark:disabled:bg-gray-600 dark:text-white"
      >
        Draw
      </button>
      <p className="mt-4 text-lg font-semibold">
        Result: {result || 'No result yet'}
      </p>
    </div>
  );
};

export default DrawLotsPage;
