import User from '@modules/users/infra/typeorm/entities/User';
import { injectable, inject } from 'tsyringe';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { classToClass } from 'class-transformer';

interface IRequest {
  user_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    const key = `providers-list:${user_id}`;
    let users = await this.cacheProvider.recover<User[]>(key);
    if (!users) {
      users = await this.usersRepository.findAllProviders({
        except_user_id: user_id,
      });
      await this.cacheProvider.save(key, classToClass(users));
    }

    if (!users || users.length <= 0) {
      throw new AppError('No providers found');
    }

    return users;
  }
}

export default ListProvidersService;
