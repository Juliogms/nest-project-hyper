import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login({ email, senha }: LoginDto) {
    const user = await this.usersService.getByEmail(email);

    if (!user) {
      throw new BadRequestException('Usuário ou Senha inválido!');
    }

    const senhaIsCorrect = await bcrypt.compare(senha, user.senha);

    if (!senhaIsCorrect) {
      throw new BadRequestException('Usuário ou Senha inválido!');
    }

    const acessstoken = this.jwtService.sign({
      id: user.id,
      email: user.email,
      senha: user.senha,
    });

    delete user.senha;

    return {
      user,
      acessstoken,
    };
  }
}
