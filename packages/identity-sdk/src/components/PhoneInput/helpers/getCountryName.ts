const regionDisplayNames = new Intl.DisplayNames(['en'], { type: 'region' });

export function getCountryName(code: string): string {
  try {
    return regionDisplayNames.of(code) ?? code;
  } catch {
    return code;
  }
}
