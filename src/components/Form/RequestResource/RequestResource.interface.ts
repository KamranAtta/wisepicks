export interface RemovePlannedResource {
  (key: number, localAction: (key: number | number[]) => void): void;
}
