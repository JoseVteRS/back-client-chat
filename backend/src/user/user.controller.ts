import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/shared/domain/dtos/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  findAll() {
    return this.userService.findAll();
  }

  @Post('create')
  async create(@Body() userData: CreateUserDto) {
    return this.userService.save(userData);
  }
}
