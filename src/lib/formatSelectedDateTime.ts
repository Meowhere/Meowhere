export function formatSelectedDateTime(date: Date, time: string): string {
  const formattedDate = date
    .toLocaleDateString('ko-KR')
    .replaceAll('.', '/')
    .replace('.', '')
    .slice(2);

  return `${formattedDate} ${time}`;
}
