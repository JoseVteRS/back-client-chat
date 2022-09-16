import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/shared/domain/dtos/create-user.dto';
import { UserDto } from 'src/shared/domain/dtos/uset.dto';
import { User, UserDocument } from 'src/shared/domain/schemas/user.schema';
import { BcryptUtil } from 'src/shared/utils/bcrypt.util';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  public findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  public async getByEmail(email: string): Promise<UserDto> {
    const user = await this.userModel.findOne({ email }).exec();

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  public async save(user: CreateUserDto): Promise<UserDto> {
    const userExists = await this.userModel
      .findOne({ email: user.email })
      .exec();

    if (userExists) throw new BadRequestException();
    user.password = BcryptUtil.hashPassword(user.password);
    const newUser = await this.userModel.create(user);
    newUser.password = undefined;
    return newUser;
  }
}
