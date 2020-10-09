import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/hashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    old_password,
    password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    // Check if user exists
    if (!user) {
      throw new AppError('User not found.');
    }

    // Check if the new email already exists
    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError('Email already in use.');
    }

    // Update data user
    user.name = name;
    user.email = email;

    // Check if old password or new password not were inform
    if (password && !old_password) {
      throw new AppError(
        'You need to inform the old password to set a new password',
      );
    }

    // Check if old password and new password were informed
    if (password && old_password) {
      // Check if old password is match
      const checkOldPassword = await this.hashProvider.compareHase(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does not match');
      }

      // Update password
      user.password = await this.hashProvider.generateHash(password);
    }

    // Return user and save new data
    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
