import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAlunoDto {
  @IsNotEmpty({
    message: 'Informe o nome do aluno.',
  })
  @IsString()
  nome: string;

  @IsNotEmpty({
    message: 'Informe o CPF do aluno.',
  })
  @IsString()
  cpf: string;

  @IsNotEmpty({
    message: 'Informe a cidade do aluno.',
  })
  @IsString()
  cidade: string;

  @IsNotEmpty({
    message: 'Informe o telefone do aluno.',
  })
  @IsString()
  telefone: string;

  @IsNotEmpty({
    message: 'Informe o plano do aluno.',
  })
  planoId: number;

  @IsNotEmpty({
    message: 'Informe o serviço do aluno.',
  })
  servicosId: number;

  @IsNotEmpty({
    message: 'Informe o filial do aluno.',
  })
  filialId: number;

  @IsNotEmpty({
    message: 'Informe o contrato do aluno.',
  })
  contratoId: number;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  senha: string;
}
