import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepositort';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProvidersService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUsersRepository);
  });
  it('should be able to list the providers', async () => {
    const lorena = await fakeUsersRepository.create({
      name: 'Lorena Silva',
      email: 'lorena@spciess.club',
      password: 'xablau',
    });

    const souza = await fakeUsersRepository.create({
      name: 'Andreza Souza',
      email: 'souza@spciess.club',
      password: 'xablau',
    });

    const leggedUser = await fakeUsersRepository.create({
      name: 'Fulanim',
      email: 'lanim@spciess.club',
      password: 'xablau',
    });

    const providers = await listProviders.execute({
      user_id: leggedUser.id,
    });

    expect(providers).toEqual([lorena, souza]);
  });
});
