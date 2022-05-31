import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('register')
  async createUser(@Body() body: CreateUserDto) {
    return this.usersService.creat(body);
  }
  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }
  @Put(':id')
  async auth(@Body() body: UpdateUserDto, @Param('id') id: number) {
    return this.usersService.update(body, id);
  }
}
