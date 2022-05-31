import { BadRequestException } from '@nestjs/common';

export function verifyDataObject(
  dataObject,
  message = 'Informe um dado para atualização!',
) {
  if (Object.entries(dataObject).length === 0) {
    throw new BadRequestException(message);
  }
}
