import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePlanoDto } from './dto/create-plano.dto';
import { PlanosService } from './planos.service';

@Controller('planos')
export class PlanosController {
  private planoService: PlanosService;

  constructor(private plano: PlanosService) {
    this.planoService = plano;
  }

  @Get()
  async listAll() {
    return this.planoService.listPlanos();
  }
  @Get(':id')
  async selectPlano(@Param('id') id: number) {
    return this.planoService.getById(id);
  }

  @Post()
  async createPlano(@Body() data: CreatePlanoDto) {
    return this.planoService.create(data);
  }

  @Put(':id')
  async updatePlano(@Body() data: CreatePlanoDto, @Param('id') id: number) {
    return this.planoService.update(data, id);
  }

  @Delete(':id')
  async deletePlano(@Param('id') id: number) {
    return this.planoService.delete(id);
  }
}
