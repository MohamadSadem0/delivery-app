export function convertLBPtoUSD(amountLBP: number, rateUSDPerLBP: number): number {
  return amountLBP * rateUSDPerLBP;
}
export function convertUSDtoLBP(amountUSD: number, rateLBPPerUSD: number): number {
  return amountUSD * rateLBPPerUSD;
}
