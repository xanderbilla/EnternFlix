export const getCardPositionClass = (
  index: number,
  itemsPerRow: number = 4,
): string => {
  const position = index % itemsPerRow;

  if (position === 0) return "left-0";
  if (position === itemsPerRow - 1) return "right-0";
  return "left-1/2 -translate-x-1/2"; // Middle items
};

export const getPositionClass = (isFirst: boolean, isLast: boolean): string => {
  if (isFirst) return "left-0";
  if (isLast) return "right-0";
  return "left-1/2 -translate-x-1/2";
};
