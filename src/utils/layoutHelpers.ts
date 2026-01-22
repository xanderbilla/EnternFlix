/**
 * Get the position class for a card in a grid layout
 * Determines whether the hover overlay should expand left, right, or center
 *
 * @param index - Card index in the grid
 * @param itemsPerRow - Number of items per row (default: 4 for desktop)
 * @returns Tailwind CSS class for positioning the hover overlay
 */
export const getCardPositionClass = (
  index: number,
  itemsPerRow: number = 4,
): string => {
  const position = index % itemsPerRow;

  if (position === 0) return "left-0"; // First item in row
  if (position === itemsPerRow - 1) return "right-0"; // Last item in row
  return "left-1/2 -translate-x-1/2"; // Middle items
};

/**
 * Get position class based on boolean flags (legacy support)
 * Use getCardPositionClass(index, itemsPerRow) for new code
 *
 * @param isFirst - Whether this is the first item in a row
 * @param isLast - Whether this is the last item in a row
 * @returns Tailwind CSS class for positioning
 */
export const getPositionClass = (isFirst: boolean, isLast: boolean): string => {
  if (isFirst) return "left-0";
  if (isLast) return "right-0";
  return "left-1/2 -translate-x-1/2";
};
