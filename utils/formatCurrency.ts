export function formatCurrency(currency: string = "", amount: number = 0) {
  const format = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    style: "currency",
    // '€' will be placed in correct position
    currency: "EUR",
  });
  const formattedAmount = format.format(amount);
  return formattedAmount.replace("€", currency);
}

export function enforceCurrencyPattern(value: string) {
  return value
    .replace(/^\s*-/, "_") // replace leading minus with _
    .replace(/[.,]/, "#") // replace first comma with #
    .replace(/[-.,]/g, "") // remove other minus and commas characters
    .replace(/_/, "-") // change back _ to minus
    .replace(/#/, ".") // change back # to dot
    .replace(/[^-\d.]/g, ""); // remove all non-numeric characters
}
