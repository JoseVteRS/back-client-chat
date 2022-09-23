import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcryptjs from 'bcryptjs';
import { Request } from 'express';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { CreateUserDto, LoginUserDto } from '../user/dtos';
import { User, UserDocument } from '../user/schema/user.schema';
import { JwtPayload } from './interfaces/jwt-payload.interface';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      const existsUser = await this.userModel.findOne({
        email: createUserDto.email,
      });
      if (existsUser) throw new NotFoundException('User exists');

      const user = await this.userModel.create({
        ...userData,
        password: bcryptjs.hashSync(password, 10),
      });
      const savedUser = await user.save();

      savedUser.password = undefined;
      return savedUser;
    } catch (error) {
      console.error(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;

    const existsUser = await this.userService.findByEmail(email);

    const comparedPasswords = bcryptjs.compareSync(
      password,
      existsUser.password,
    );
    if (!comparedPasswords) throw new NotFoundException('User not found');

    existsUser.password = undefined;

    return { token: this.getJwtToken({ id: existsUser._id }) };
  }

  async checkAuthStatus(user: User) {
    return {
      ...user,
      token: this.getJwtToken({ id: user._id }),
    };
  }

  async getProfile(req: Request) {
    const user = req.user as User;
    user.password = undefined;
    return {
      user,
    };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
