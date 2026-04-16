import { PartialType } from '@nestjs/mapped-types';
import { CreateLensColourDto } from './create-lenscolour.dto';

export class UpdateLensColourDto extends PartialType(CreateLensColourDto) { }
