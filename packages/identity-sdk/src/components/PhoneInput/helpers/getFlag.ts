export function getFlag(countryCode: string): string {
  const base = 0x1f1e6 - 65;
  return String.fromCodePoint(base + countryCode.charCodeAt(0), base + countryCode.charCodeAt(1));
}
