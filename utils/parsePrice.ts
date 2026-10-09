export const parsePrice = (price: string | number): number => {
  if (typeof price === 'number') return price;
  if (!price) return 0;
  const cleanPrice = price.toString().replace(/[^\d.]/g, '');
  return parseFloat(cleanPrice) || 0;
};
