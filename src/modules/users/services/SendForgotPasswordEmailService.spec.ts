import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepositort';
import FakeMailProvider from '@shared/container/providers/MailProvider/Fakes/FakeMailProvider';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

describe('SendForgotPasswordEmail', () => {
  it('should be able to recovery password using the email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();
    const sandForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
    );

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'Fulaninho Arrochado',
      email: 'lanim@spicess.club',
      password: 'xablau',
    });
    await sandForgotPasswordEmail.execute({
      email: 'lanim@spicess.club',
    });
    expect(sendMail).toBeCalled();
  });
});
