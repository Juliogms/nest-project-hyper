import { Module } from '@nestjs/common';
import { DataBaseService } from './database.service';
@Module({
  imports: [DataBaseModule],
  providers: [DataBaseService],
  exports: [DataBaseService],
})
export class DataBaseModule {}
