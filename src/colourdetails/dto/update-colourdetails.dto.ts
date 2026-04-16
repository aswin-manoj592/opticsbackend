import { PartialType } from '@nestjs/mapped-types';
import { CreateColourDetailsDto } from './create-colourdetails.dto';

export class UpdateColourDetailsDto extends PartialType(CreateColourDetailsDto) { }
