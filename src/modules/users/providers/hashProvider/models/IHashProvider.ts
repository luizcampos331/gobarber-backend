export default interface IHaseProvider {
  generateHash(payload: string): Promise<string>;
  compareHase(payload: string, hashed: string): Promise<boolean>;
}
