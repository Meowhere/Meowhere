export interface KakaoPlace {
  id: string;
  place_name: string;
  x: string;
  y: string;
  [key: string]: any;
}

export type KakaoStatus = 'OK' | 'ZERO_RESULT' | 'ERROR';
