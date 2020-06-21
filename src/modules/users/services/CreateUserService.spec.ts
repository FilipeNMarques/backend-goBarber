import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepositort';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

describe('Create User', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'Fulanim',
      email: 'lano@spicess.com',
      password: 'xablau',
    });

    expect(user).toHaveProperty('id');
  });

  it('should be not able to create a new user with email already used', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'Fulanim',
      email: 'lano@spicess.com',
      password: 'xablau',
    });

    expect(
      createUser.execute({
        name: 'Fulanim',
        email: 'lano@spicess.com',
        password: 'xablau',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
