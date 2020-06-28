import { getRepository, Repository } from 'typeorm';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

class UserTokensRepository implements IUserTokensRepository {
  private ormRpository: Repository<UserToken>;

  constructor() {
    this.ormRpository = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRpository.findOne({
      where: { token },
    });

    return userToken;
  }

  public async generate(user_id: string): Promise<userToken> {
    const userToken = this.ormRpository.create({
      user_id,
    });

    await this.ormRpository.save(userToken);

    return userToken;
  }
}

export default UserTokensRepository;
