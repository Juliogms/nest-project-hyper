import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataBaseService } from 'src/database/database.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';

@Injectable()
export class AlunosService {
  constructor(private db: DataBaseService) {}

  async listAlunos() {
    return this.db.alunos.findMany();
  }

  async create({
    nome,
    cpf,
    cidade,
    telefone,
    planoId,
    servicosId,
    contratoId,
    filialId,
    email,
    senha,
  }: CreateAlunoDto) {
    return this.db.alunos.create({
      data: {
        nome,
        cpf,
        cidade,
        telefone,
        planos: {
          connect: {
            id: Number(planoId),
          },
        },
        servicos: {
          connect: {
            id: Number(servicosId),
          },
        },
        contrato: {
          connect: {
            id: Number(contratoId),
          },
        },
        filiais: {
          connect: {
            id: Number(filialId),
          },
        },
        users: {
          create: {
            email,
            senha,
          },
        },
      },
    });
  }

  async update(id: number, { nome, cidade, telefone }: UpdateAlunoDto) {
    id = Number(id);

    if (isNaN(id)) {
      throw new BadRequestException('ID inválido.');
    }

    const updateAluno = await this.db.alunos.update({
      where: {
        id,
      },
      data: {
        nome,
        cidade,
        telefone,
      },
    });

    return updateAluno;
  }

  async delete(id: number) {
    id = Number(id);

    if (isNaN(id)) {
      throw new BadRequestException('ID inválido.');
    }

    const alunodelete = await this.db.alunos.delete({
      where: {
        id,
      },
    });

    if (!alunodelete) {
      throw new NotFoundException('Aluno não existe.');
    }

    return alunodelete;
  }
}
