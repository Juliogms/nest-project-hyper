import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

import { AlunosService } from './alunos.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';

@Controller('alunos')
export class AlunosController {
  private alunosService: AlunosService;

  constructor(private aluno: AlunosService) {
    this.alunosService = aluno;
  }

  @UseGuards(AuthGuard)
  @Get()
  async listAll() {
    return this.alunosService.listAlunos();
  }

  @Post()
  async createAluno(@Body() body: CreateAlunoDto) {
    return this.alunosService.create(body);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async updateAluno(@Param('id') id: number, @Body() body: UpdateAlunoDto) {
    return this.alunosService.update(id, body);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteAluno(@Param('id') id: number) {
    return this.alunosService.delete(id);
  }
}
