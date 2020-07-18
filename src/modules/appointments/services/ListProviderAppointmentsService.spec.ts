import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointsmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointments: ListProviderAppointmentsService;

describe('ListProviderAppointmentsService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
    );
  });
  it('should be able to list all appointments on choiced day', async () => {
    const appointmentOne = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: '123',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });
    const appointmentTwo = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: '123',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    const availability = await listProviderAppointments.execute({
      provider_id: 'provider',
      day: 20,
      year: 2020,
      month: 5,
    });
    expect(availability).toEqual([appointmentOne, appointmentTwo]);
  });
});
