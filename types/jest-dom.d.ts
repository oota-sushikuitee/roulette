import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveTextContent(text: string | RegExp): R;
      toHaveValue(value: string | string[] | number | null): R;
    }
  }
}

// この空のエクスポートはTypeScriptにこのファイルをモジュールとして扱わせるために必要です
export {};
