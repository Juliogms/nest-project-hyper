import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { DataBaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private db: DataBaseService) {}

  async listServicos() {
    return this.db.users.findMany();
  }

  async getByEmail(email: string) {
    const user = await this.db.users.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async creat({ email, senha }: CreateUserDto) {
    const salt = bcrypt.genSaltSync(10);
    return this.db.users.create({
      data: {
        email,
        senha: bcrypt.hashSync(senha, salt),
      },
    });
  }

  async update({ email }: UpdateUserDto, id: number) {
    const user = await this.getByEmail(email);

    if (user && user.id !== +id) {
      throw new BadRequestException('Email Inválido');
    }

    await this.getById(id);
    return this.db.users.update({
      where: {
        id: Number(id),
      },
      data: {
        email,
      },
    });
  }

  async getById(id: number) {
    id = Number(id);
    const user = await this.db.users.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotAcceptableException('Usuário não encontrado.');
    }

    return user;
  }

  async delete(id: number) {
    const users = await this.getById(id);

    return this.db.users.delete({
      where: {
        id: users.id,
      },
    });
  }
}
