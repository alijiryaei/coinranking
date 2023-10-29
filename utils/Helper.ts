/* eslint-disable import/prefer-default-export */


const priceFormatter = (price: string | number): string => {
  const newPrice = Number(price);
  const formattedPrice =
    newPrice > 0.01 ? newPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : newPrice.toFixed(7);

  return `$${formattedPrice}`;
};

export { priceFormatter };
