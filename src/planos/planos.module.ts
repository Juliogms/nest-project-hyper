import { Module } from '@nestjs/common';
import { DataBaseModule } from 'src/database/database.module';
import { PlanosController } from './planos.controller';
import { PlanosService } from './planos.service';

@Module({
  imports: [DataBaseModule],
  controllers: [PlanosController],
  providers: [PlanosService],
  exports: [PlanosService],
})
export class PlanosModule {}
