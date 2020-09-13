// import AppError from '@shared/errors/AppError';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import AppError from '@shared/errors/AppError';
import ListProvidersService from './ListProvidersService';

let fakeCacheProvider: FakeCacheProvider;
let fakeUserRepository: FakeUserRepository;
let listProvider: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeCacheProvider = new FakeCacheProvider();
    fakeUserRepository = new FakeUserRepository();
    listProvider = new ListProvidersService(
      fakeUserRepository,
      fakeCacheProvider,
    );
  });
  it('should be able to list providers', async () => {
    const provider1 = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    const provider2 = await fakeUserRepository.create({
      name: 'John Doe2',
      email: 'johndoe2@email.com',
      password: '123123',
    });

    const loggedUser = await fakeUserRepository.create({
      name: 'John Doe3',
      email: 'johndoe3@email.com',
      password: '123321',
    });

    const providers = await listProvider.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([provider1, provider2]);
  });

  it('should not be able to list providers if they does not exist', async () => {
    const loggedUser = await fakeUserRepository.create({
      name: 'John Doe3',
      email: 'johndoe3@email.com',
      password: '123321',
    });

    await expect(
      listProvider.execute({
        user_id: loggedUser.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
