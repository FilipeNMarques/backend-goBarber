import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointsmentsRepository';
import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentRepository: FakeAppointmentRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    createAppointment = new CreateAppointmentService(fakeAppointmentRepository);
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '234',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('234');
  });

  it('should be not abel to create two appointments on the same date', async () => {
    const appointmentDate = new Date(2020, 5, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '234',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
