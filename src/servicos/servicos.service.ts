import { Injectable, NotAcceptableException } from '@nestjs/common';

import { DataBaseService } from 'src/database/database.service';
import { verifyDataObject } from 'src/utils/verify-object';
import { CreateServicoDto } from './dto/create-servico.dto';
import { UpdateServicoDto } from './dto/update-servico.dto';

@Injectable()
export class ServicosService {
  constructor(private db: DataBaseService) {}

  async listServicos() {
    return this.db.servicos.findMany();
  }

  async getById(id: number) {
    id = Number(id);
    const servico = await this.db.servicos.findUnique({
      where: {
        id,
      },
    });

    if (!servico) {
      throw new NotAcceptableException('Serviço não encontrado.');
    }

    return servico;
  }

  async create({ nome }: CreateServicoDto) {
    return this.db.servicos.create({
      data: {
        nome,
      },
    });
  }

  async update(data: UpdateServicoDto, id: number) {
    const servico = await this.getById(id);

    const updateData: UpdateServicoDto = {};

    if (data.nome) {
      updateData.nome = data.nome;
    }

    verifyDataObject(updateData);

    return this.db.servicos.update({
      data: updateData,
      where: {
        id: servico.id,
      },
    });
  }

  async delete(id: number) {
    const servicos = await this.getById(id);

    return this.db.servicos.delete({
      where: {
        id: servicos.id,
      },
    });
  }
}
