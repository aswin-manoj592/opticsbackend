import { PartialType } from '@nestjs/mapped-types';
import { CreateMadeByDto } from './create-madeby.dto';

export class UpdateMadeByDto extends PartialType(CreateMadeByDto) {}
