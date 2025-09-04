export function toISO(date: Date): string {
  return date.toISOString();
}
export function addMinutes(date: Date, mins: number): Date {
  return new Date(date.getTime() + mins * 60000);
}
export function nowISO(): string {
  return new Date().toISOString();
}

