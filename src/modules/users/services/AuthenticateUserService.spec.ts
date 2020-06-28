import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepositort';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe('Authenticate User', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
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

  it('should not be able to authenticate with nonexistent user', async () => {
    expect(
      authenticateUser.execute({
        email: 'lano@spicess.com',
        password: 'xablau',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with a wrong password', async () => {
    await createUser.execute({
      name: 'Fulanim da Silva',
      email: 'lano@spicess.com',
      password: 'xablau',
    });

    await expect(
      authenticateUser.execute({
        email: 'lano@spicess.com',
        password: 'xablau1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
