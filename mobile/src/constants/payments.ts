export const SupportedCurrencies = ['LBP', 'USD'] as const;
export const DefaultCurrency: (typeof SupportedCurrencies)[number] = 'LBP';
