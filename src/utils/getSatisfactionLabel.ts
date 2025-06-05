export function getSatisfactionLabel(rating: number): string {
  if (rating >= 4.5) return '매우 만족';
  if (rating >= 4.0) return '만족';
  return '보통';
}
