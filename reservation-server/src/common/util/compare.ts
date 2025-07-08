export function determineToDeleteIds<T extends { id: number }>(
  current: T[],
  newItems: T[],
): number[] {
  const newIds = newItems.map((item) => item.id);
  const toDelete = current.filter(
    (currentItem) => !newIds.includes(currentItem.id),
  );
  return toDelete.map((item) => item.id);
}
