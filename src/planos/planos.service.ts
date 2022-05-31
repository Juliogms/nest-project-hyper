import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { DataBaseService } from 'src/database/database.service';
import { CreatePlanoDto } from 'src/planos/dto/create-plano.dto';
import { UpdatePlanosDto } from './dto/update-plano.dto';

@Injectable()
export class PlanosService {
  constructor(private db: DataBaseService) {}

  async listPlanos() {
    return this.db.planos.findMany();
  }

  async getById(id: number) {
    id = Number(id);
    const planos = await this.db.planos.findUnique({
      where: {
        id,
      },
    });

    if (!planos) {
      throw new NotAcceptableException('Plano não encontrado.');
    }

    return planos;
  }

  async create(data: CreatePlanoDto) {
    if (!data.nome) {
      throw new BadRequestException('O nome do plano é obrigatório!');
    }

    return this.db.planos.create({
      data,
    });
  }

  async update(data: UpdatePlanosDto, id: number) {
    const servico = await this.getById(id);

    const updateData: UpdatePlanosDto = {};

    if (data.nome) {
      updateData.nome = data.nome;
    }

    return this.db.planos.update({
      data: updateData,
      where: {
        id: servico.id,
      },
    });
  }

  async delete(id: number) {
    const planos = await this.getById(id);

    return this.db.planos.delete({
      where: {
        id: planos.id,
      },
    });
  }
}
