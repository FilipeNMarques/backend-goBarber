import AppError from '@shared/errors/AppError';

import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepositort';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Fulanim',
      email: 'lanim@spciess.com',
      password: 'xablau',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Achano Silva',
      email: 'achano@spicecss.club',
    });

    expect(updatedUser.name).toBe('Achano Silva');
    expect(updatedUser.email).toBe('achano@spicecss.club');
  });

  it('should be not able to change email for another used email', async () => {
    await fakeUsersRepository.create({
      name: 'Fulanim',
      email: 'lanim@spciess.com',
      password: 'xablau',
    });

    const user = await fakeUsersRepository.create({
      name: 'Testando',
      email: 'test@spciess.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Fulanim',
        email: 'lanim@spciess.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Fulanim',
      email: 'lanim@spciess.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Achano Silva',
      email: 'achano@spicecss.club',
      old_password: '123456',
      password: 'test',
    });

    expect(updatedUser.name).toBe('Achano Silva');
    expect(updatedUser.email).toBe('achano@spicecss.club');
  });

  it('should be not able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Fulanim',
      email: 'lanim@spciess.com',
      password: 'xablau',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Achano Silva',
        email: 'achano@spicecss.club',
        password: 'xablau',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be not able to update the password without wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Fulanim',
      email: 'lanim@spciess.com',
      password: 'xablau',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Achano Silva',
        email: 'achano@spicecss.club',
        old_password: 'wrong password',
        password: 'xablau',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
