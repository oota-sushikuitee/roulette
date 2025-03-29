'use client';

import React, { useState, useEffect, useRef } from 'react';
import { drawLots } from '../utils/drawLots';
import GroupManager from './components/GroupManager';
import ThemeSelector, {
  Theme,
  availableThemes,
} from './components/ThemeSelector';

const DrawLotsPage = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [removeWinner, setRemoveWinner] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [history, setHistory] = useState<
    Array<{ winner: string; timestamp: Date }>
  >([]);
  const [theme, setTheme] = useState<Theme>(availableThemes[0]);
  const [winnerRevealed, setWinnerRevealed] = useState(false);
  const rouletteRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ローカルストレージから履歴を読み込む
    const savedHistory = localStorage.getItem('rouletteHistory');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('履歴の読み込みに失敗しました', e);
      }
    }
  }, []);

  // 履歴が更新されたらローカルストレージに保存
  useEffect(() => {
    localStorage.setItem('rouletteHistory', JSON.stringify(history));
  }, [history]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleDraw = () => {
    const items = input.split('\n').filter((item) => item.trim() !== '');
    if (items.length === 0) return;

    setIsSpinning(true);
    setWinnerRevealed(false);
    setResult(null);

    // ルーレットアニメーション
    if (rouletteRef.current) {
      const rouletteItems = rouletteRef.current.children;
      let currentIndex = 0;

      const interval = setInterval(() => {
        // すべての項目からハイライトを削除
        Array.from(rouletteItems).forEach((item) => {
          item.classList.remove(
            'highlight',
            'bg-yellow-200',
            'dark:bg-yellow-800'
          );
        });

        // インデックスを更新
        currentIndex = (currentIndex + 1) % items.length;

        // 新しい項目をハイライト
        if (rouletteItems[currentIndex]) {
          rouletteItems[currentIndex].classList.add(
            'highlight',
            'bg-yellow-200',
            'dark:bg-yellow-800'
          );
        }
      }, 100);

      // スピード調整 - 徐々に遅くする
      setTimeout(() => {
        clearInterval(interval);

        let slowDownInterval = 100;
        let slowIndex = currentIndex;

        const slowDownAnimation = () => {
          // すべての項目からハイライトを削除
          Array.from(rouletteItems).forEach((item) => {
            item.classList.remove(
              'highlight',
              'bg-yellow-200',
              'dark:bg-yellow-800'
            );
          });

          // インデックスを更新
          slowIndex = (slowIndex + 1) % items.length;

          // 新しい項目をハイライト
          if (rouletteItems[slowIndex]) {
            rouletteItems[slowIndex].classList.add(
              'highlight',
              'bg-yellow-200',
              'dark:bg-yellow-800'
            );
          }

          // 徐々に遅くする
          slowDownInterval += 50;

          if (slowDownInterval < 500) {
            setTimeout(slowDownAnimation, slowDownInterval);
          } else {
            // 最終的な当選者の処理
            finishRouletteAnimation(items);
          }
        };

        // 最初の遅い回転を開始
        setTimeout(slowDownAnimation, slowDownInterval);
      }, 2000);
    } else {
      // フォールバック: アニメーションなしの場合
      setTimeout(() => {
        finishRouletteAnimation(items);
      }, 2000);
    }
  };

  const finishRouletteAnimation = (items: string[]) => {
    setIsSpinning(false);

    const { winner, remainingItems } = drawLots(items, removeWinner);

    if (winner) {
      setResult(winner);
      setWinnerRevealed(true);
      // 履歴に追加
      setHistory((prev) => [
        { winner, timestamp: new Date() },
        ...prev.slice(0, 19),
      ]);
      setInput(remainingItems.join('\n'));
    }
  };

  const handleToggle = () => {
    setRemoveWinner((prevState) => !prevState);
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('rouletteHistory');
  };

  const handleSelectGroup = (items: string[]) => {
    setInput(items.join('\n'));
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  const hasItems =
    input.split('\n').filter((item) => item.trim() !== '').length > 0;

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center ${theme.bgColor} ${theme.textColor} p-4`}
    >
      <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row md:items-start md:space-x-6">
        {/* メインコンテンツ */}
        <div className="w-full md:w-2/3 flex flex-col items-center">
          <div className="w-full max-w-md mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">抽選エリア</h2>
              <ThemeSelector onThemeChange={handleThemeChange} />
            </div>

            <textarea
              rows={10}
              cols={30}
              value={input}
              onChange={handleChange}
              placeholder="改行区切りで抽選対象を入力してください"
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded mb-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              disabled={isSpinning}
            />

            <div className="flex items-center mb-4">
              <input
                id="removeWinner"
                type="checkbox"
                checked={removeWinner}
                onChange={handleToggle}
                className="mr-2"
                disabled={isSpinning}
              />
              <label htmlFor="removeWinner">当選者をリストから削除する</label>
            </div>

            <button
              onClick={handleDraw}
              disabled={!hasItems || isSpinning}
              className={`w-full px-4 py-2 ${theme.primaryColor} text-white rounded disabled:bg-gray-300 dark:disabled:bg-gray-600 transition-colors`}
            >
              {isSpinning ? '抽選中...' : '抽選開始'}
            </button>
          </div>

          {/* 抽選中アニメーション */}
          {isSpinning && (
            <div
              ref={rouletteRef}
              className="w-full max-w-md mb-4 border border-gray-300 dark:border-gray-700 rounded overflow-hidden"
            >
              {input
                .split('\n')
                .filter((item) => item.trim() !== '')
                .map((item, index) => (
                  <div
                    key={index}
                    className="p-2 transition-colors roulette-item"
                  >
                    {item}
                  </div>
                ))}
            </div>
          )}

          {/* 結果表示 */}
          {result && !isSpinning && (
            <div
              ref={resultRef}
              className={`mt-4 p-4 ${theme.accentColor} rounded-lg border border-green-300 dark:border-green-700 text-center w-full max-w-md ${winnerRevealed ? 'winner-reveal' : ''}`}
            >
              <p className="text-lg font-semibold">当選結果:</p>
              <p className="text-2xl font-bold animate-pulse-custom">
                {result}
              </p>
            </div>
          )}

          {/* グループ管理 */}
          <GroupManager onSelectGroup={handleSelectGroup} />
        </div>

        {/* サイドバー - 履歴 */}
        <div className="w-full md:w-1/3 mt-8 md:mt-0 mobile-full-width">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold">抽選履歴</h2>
            {history.length > 0 && (
              <button
                onClick={handleClearHistory}
                className="text-red-500 dark:text-red-400 hover:underline focus:outline-none text-sm"
              >
                履歴をクリア
              </button>
            )}
          </div>

          <div className="border border-gray-300 dark:border-gray-700 rounded overflow-hidden bg-white dark:bg-gray-800">
            {history.length > 0 ? (
              <ul className="max-h-[500px] overflow-y-auto">
                {history.map((item, index) => (
                  <li
                    key={index}
                    className="p-3 border-b border-gray-300 dark:border-gray-700 last:border-b-0"
                  >
                    <p className="font-medium">{item.winner}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(item.timestamp).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="p-4 text-center text-gray-500 dark:text-gray-400">
                履歴がありません
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawLotsPage;
