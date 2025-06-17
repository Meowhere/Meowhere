export function getSatisfactionLabel(rating: number): string {
  if (rating >= 4.5) {
    return '매우 만족';
  } else if (rating >= 4.0) {
    return '만족';
  } else if (rating >= 3.0) {
    return '보통';
  } else {
    return '불만족';
  }
}
