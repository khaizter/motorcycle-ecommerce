export const toCurrency = (value: number | string) => {
  return `₱ ${Number(value).toFixed(2)}`;
};
