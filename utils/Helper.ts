/* eslint-disable import/prefer-default-export */

const USDollar = new Intl.NumberFormat("en-US");

const priceFormatter = (price: string | number): string => {
  const newPrice = Number(price);
  const fixedNumber =
    newPrice > 0.01 ? newPrice.toFixed(2) : newPrice.toFixed(7);

  return `$${USDollar.format(+fixedNumber)}`;
};


export { priceFormatter };
