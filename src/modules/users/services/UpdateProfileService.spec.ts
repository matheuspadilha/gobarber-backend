import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
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

  it('should be able to update profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: 'Teste123',
    });

    const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Jhon Trê',
      email: 'jhontre@email.com',
    });

    expect(updateUser.name).toBe('Jhon Trê');
    expect(updateUser.email).toBe('jhontre@email.com');
  });

  it('should not be able show the profile from non-existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing-user-id',
        name: 'Jhon Trê',
        email: 'jhontre@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: 'Teste123',
    });

    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@example.com',
      password: 'Teste123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Jhon Trê',
        email: 'jhondoe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: 'Teste123',
    });

    const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Jhon Trê',
      email: 'jhontre@email.com',
      old_password: 'Teste123',
      password: 'Teste1234',
    });

    expect(updateUser.password).toBe('Teste1234');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: 'Teste123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Jhon Trê',
        email: 'jhontre@email.com',
        password: 'Teste1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: 'Teste123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Jhon Trê',
        email: 'jhontre@email.com',
        old_password: 'wrong-old-password',
        password: 'Teste1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
