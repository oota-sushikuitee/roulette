import { drawLots } from '../../utils/drawLots';

describe('drawLots', () => {
  test('returns null when no items are provided', () => {
    const { winner, remainingItems } = drawLots([], false);
    expect(winner).toBeNull();
    expect(remainingItems).toEqual([]);
  });

  test('returns a winner and keeps all items if removeWinner is false', () => {
    const items = ['item1', 'item2', 'item3'];
    const { winner, remainingItems } = drawLots(items, false);
    expect(winner).toBeDefined();
    expect(remainingItems).toEqual(items);
  });

  test('returns a winner and removes it from the items if removeWinner is true', () => {
    const items = ['item1', 'item2', 'item3'];
    const { winner, remainingItems } = drawLots(items, true);
    expect(winner).toBeDefined();
    expect(remainingItems).toHaveLength(items.length - 1);
    expect(remainingItems).not.toContain(winner);
  });
});
