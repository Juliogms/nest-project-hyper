import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get()
  async listAll() {
    return this.usersService.listServicos();
  }

  @Post()
  async createUser(@Body() body: CreateUserDto) {
    return this.usersService.creat(body);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async updateUser(@Body() data: CreateUserDto, @Param('id') id: number) {
    return this.usersService.update(data, id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return this.usersService.delete(id);
  }
}
