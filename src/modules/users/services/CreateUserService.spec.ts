import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepositort';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let createUser: CreateUserService;

describe('Create User', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });
  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Fulanim',
      email: 'lano@spicess.com',
      password: 'xablau',
    });

    expect(user).toHaveProperty('id');
  });

  it('should be not able to create a new user with email already used', async () => {
    await createUser.execute({
      name: 'Fulanim',
      email: 'lano@spicess.com',
      password: 'xablau',
    });

    await expect(
      createUser.execute({
        name: 'Fulanim',
        email: 'lano@spicess.com',
        password: 'xablau',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
