// import AppError from '@shared/errors/AppError';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';

import ListProviderMonthAvaliabilityService from './ListProviderMonthAvaliabilityService';

let fakeUserRepository: FakeUserRepository;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvaliability: ListProviderMonthAvaliabilityService;

describe('ListProviderMonthAvaliability', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvaliability = new ListProviderMonthAvaliabilityService(
      fakeAppointmentsRepository,
    );
  });
  it('should be able to list avaliable days given a month', async () => {
    const provider = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 8, 0, 0),
      provider_id: provider.id,
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 9, 0, 0),
      provider_id: provider.id,
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 10, 0, 0),
      provider_id: provider.id,
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 11, 0, 0),
      provider_id: provider.id,
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 12, 0, 0),
      provider_id: provider.id,
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 13, 0, 0),
      provider_id: provider.id,
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 14, 0, 0),
      provider_id: provider.id,
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 15, 0, 0),
      provider_id: provider.id,
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 16, 0, 0),
      provider_id: provider.id,
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 17, 0, 0),
      provider_id: provider.id,
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 21, 8, 0, 0),
      provider_id: provider.id,
    });

    const avaliability = await listProviderMonthAvaliability.execute({
      provider_id: provider.id,
      year: 2020,
      month: 5, // é o mesmo que o 4 (o server trata)
    });

    expect(avaliability).toEqual(
      expect.arrayContaining([
        {
          day: 19,
          available: true,
        },
        {
          day: 20,
          available: false,
        },
        {
          day: 21,
          available: true,
        },
        {
          day: 22,
          available: true,
        },
      ]),
    );
  });
});
