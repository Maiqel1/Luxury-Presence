export function loanAmount(price: number, downPaymentPercent: number) {
  return Math.max(0, price * (1 - downPaymentPercent / 100));
}

export function monthlyPayment(principal: number, annualRatePercent: number, years: number) {
  const payments = years * 12;
  if (principal <= 0 || payments <= 0) return 0;
  const monthlyRate = annualRatePercent / 100 / 12;
  if (monthlyRate <= 0) return principal / payments;
  return (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -payments));
}

export const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
