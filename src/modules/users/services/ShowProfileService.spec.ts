import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepositort';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('showProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });
  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Fulanim',
      email: 'lanim@spciess.com',
      password: 'xablau',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('Fulanim');
    expect(profile.email).toBe('lanim@spciess.com');
  });

  it('should be not able to show the profile with a non-existing user', async () => {
    await expect(
      showProfile.execute({
        user_id: 'non-existing user id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
