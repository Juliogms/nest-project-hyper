import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({
    message: 'Informe o email do usuário.',
  })
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8, {
    message: 'A senha deve ter no mínimo 8 caracteres!',
  })
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%])/, {
    message:
      'A senha deve ter pelo menos uma letra minúscula, uma letra maiúscula, um número e um caracter especial.',
  })
  senha: string;
}
