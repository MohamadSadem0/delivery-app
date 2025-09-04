export type DeepLink = {
  name: string; // human friendly
  pattern: RegExp;
  to: (params: Record<string, string>) => string; // expo-router href
};

