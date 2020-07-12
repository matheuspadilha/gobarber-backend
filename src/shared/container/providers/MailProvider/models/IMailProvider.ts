export default interface IMailsProvider {
  sendMail(to: string, body: string): Promise<void>;
}
