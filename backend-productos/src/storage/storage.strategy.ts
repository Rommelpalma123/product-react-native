export interface IStorageStrategy {
  imagetoBase64(base64: string): Promise<string>;
}
