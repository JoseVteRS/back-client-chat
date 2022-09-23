import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async findByEmail(email: string): Promise<User> {
    const existsUser = await this.userModel.findOne({ email });

    if (!existsUser) throw new NotFoundException('User not found');
    delete existsUser.password;

    return existsUser;
  }
}
