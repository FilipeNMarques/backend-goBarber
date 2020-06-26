import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRpository';
import IMailProvider from '@shared/container/providers/MailProvider/Models/IMailProvider';

interface IRequest {
  email: string;
}
@injectable()
class SendForgotEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    this.mailProvider.sendMail(
      email,
      'Pedido de recuperação de senha recebido.',
    );
  }
}

export default SendForgotEmailService;
