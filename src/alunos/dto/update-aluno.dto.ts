import { IsOptional } from 'class-validator';

export class UpdateAlunoDto {
  @IsOptional()
  nome: string;

  @IsOptional()
  cidade: string;

  @IsOptional()
  telefone: string;

  @IsOptional()
  planoId: number;

  @IsOptional()
  filialId: number;

  @IsOptional()
  servicosId: number;

  @IsOptional()
  contratoId: number;

  @IsOptional()
  email: number;

  @IsOptional()
  senha: number;
}
