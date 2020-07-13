import ISendMailDTO from '../dtos/ISendMailDTO';

export default interface IMailsProvider {
  sendMail(data: ISendMailDTO): Promise<void>;
}
