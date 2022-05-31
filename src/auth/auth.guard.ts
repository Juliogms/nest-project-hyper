import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 1 selecionar as informações do cabeçalho da requisisção

    const request = context.switchToHttp().getRequest();
    console.log(request.headers);

    const Authorization = request.headers['authorization'];

    if (!Authorization) {
      throw new UnauthorizedException('Autorização não informada.');
    }

    const token = Authorization.split(' ')[1];

    this.jwtService.verify(token);

    return true;
  }
}
