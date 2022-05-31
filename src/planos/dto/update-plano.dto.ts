import { PartialType } from '@nestjs/mapped-types';
import { CreatePlanoDto } from './create-plano.dto';

export class UpdatePlanosDto extends PartialType(CreatePlanoDto) {}
