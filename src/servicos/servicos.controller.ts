import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateServicoDto } from './dto/create-servico.dto';
import { ServicosService } from './servicos.service';

@Controller('servicos')
export class ServicosController {
  private servicoService: ServicosService;

  constructor(private service: ServicosService) {
    this.servicoService = service;
  }

  @Get()
  async listAll() {
    return this.servicoService.listServicos();
  }

  @Get(':id')
  async selectServico(@Param('id') id: number) {
    return this.servicoService.getById(id);
  }

  @Post()
  async createServico(@Body() data: CreateServicoDto) {
    return this.servicoService.create(data);
  }

  @Put(':id')
  async updateService(@Body() data: CreateServicoDto, @Param('id') id: number) {
    return this.servicoService.update(data, id);
  }

  @Delete(':id')
  async deleteServico(@Param('id') id: number) {
    return this.servicoService.delete(id);
  }
}
