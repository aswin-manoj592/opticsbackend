import { PartialType } from '@nestjs/mapped-types';
import { CreateColourCodeDto } from './create-colour-code.dto';

export class UpdateColourCodeDto extends PartialType(CreateColourCodeDto) { }
