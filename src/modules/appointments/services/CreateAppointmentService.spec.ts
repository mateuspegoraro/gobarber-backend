import AppError from '@shared/errors/AppError';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentRepository: FakeAppointmentRepository;
let createAppointmentService: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointmentService.execute({
      date: new Date(),
      user_id: '654321',
      provider_id: '123456',
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should not be able to create two appointments on the same datetime', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointmentService.execute({
      date: appointmentDate,
      user_id: '654321',
      provider_id: '123456',
    });

    await expect(
      createAppointmentService.execute({
        date: appointmentDate,
        user_id: '654321',
        provider_id: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
