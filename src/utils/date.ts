const DEFAULT_DATE_FORMAT = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

export function formatDate(date: Date): string {
  return DEFAULT_DATE_FORMAT.format(date);
}
