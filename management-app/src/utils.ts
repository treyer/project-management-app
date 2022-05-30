const reorder = <T extends { order: number }>(
  values: T[],
  {
    removeIndex,
    insertIndex,
    valueToInsert,
  }: { removeIndex?: number; insertIndex?: number; valueToInsert?: T }
) => {
  const result = values.map((value) => ({ ...value }));
  if (removeIndex !== undefined) {
    result.splice(removeIndex, 1);
  }

  if (insertIndex !== undefined && valueToInsert !== undefined) {
    result.splice(insertIndex, 0, { ...valueToInsert });
  }

  result.forEach((value, index) => {
    value.order = index + 1;
  });

  return result;
};

const comparator = <T extends { order: number }>(a: T, b: T, direction = 1) =>
  a.order > b.order ? direction : -direction;

export { reorder, comparator };
