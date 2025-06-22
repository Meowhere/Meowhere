export const getTodayDateStr = (): string => {
  const today = new Date();
  const offset = today.getTimezoneOffset() * 60000; // ms 단위
  const localDate = new Date(today.getTime() - offset);
  return localDate.toISOString().split('T')[0]; // YYYY-MM-DD
};

export const getMinStartTime = (dateStr: string): string => {
  const todayStr = getTodayDateStr();
  // 오늘이면 현재 시각 기준 HH:mm 반환
  if (dateStr === todayStr) {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  // 내일 이후면 00:00부터 가능
  return '00:00';
};

export const getMinEndTimeStr = (startTime?: string): string | undefined => {
  if (!startTime || !/^\d{2}:\d{2}$/.test(startTime)) return undefined;

  return startTime;
};

export const normalizeEndTime = (startTime: string, endTime: string): string => {
  if (!/\d{2}:\d{2}/.test(startTime) || !/\d{2}:\d{2}/.test(endTime)) return endTime;

  const [startH, startM] = startTime.split(':').map(Number);
  const [endH, endM] = endTime.split(':').map(Number);

  const startMin = startH * 60 + startM;
  const endMin = endH * 60 + endM;

  if (endMin <= startMin) {
    const adjusted = endMin + 720;
    const normH = String(Math.floor(adjusted / 60) % 24).padStart(2, '0');
    const normM = String(adjusted % 60).padStart(2, '0');
    return `${normH}:${normM}`;
  }

  return endTime;
};
