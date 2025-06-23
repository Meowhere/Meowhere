export {};

declare global {
  interface Window {
    kakao: any;
    testBadge: (category: string) => void;
  }
}
