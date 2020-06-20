import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointsmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '234',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('234');
  });

  // it('should be not abel to create two appointments on the same date', () => {
  //   expect().toBe();
  // });
});
