export function drawLots(
  items: string[],
  removeWinner: boolean
): { winner: string | null; remainingItems: string[] } {
  const filteredItems = items.filter((item) => item.trim() !== '');
  if (filteredItems.length === 0) {
    return { winner: null, remainingItems: items };
  }
  const randomIndex = Math.floor(Math.random() * filteredItems.length);
  const winner = filteredItems[randomIndex];
  const remainingItems = removeWinner
    ? filteredItems.filter((_, index) => index !== randomIndex)
    : filteredItems;
  return { winner, remainingItems };
}
