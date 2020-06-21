import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepositort';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('Authenticate User', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'Fulanim da Silva',
      email: 'lano@spicess.com',
      password: 'xablau',
    });

    const response = await authenticateUser.execute({
      email: 'lano@spicess.com',
      password: 'xablau',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toBe(user);
  });
});
