import { PartialType } from '@nestjs/mapped-types';
import { CreateFrameTypeDto } from './create-frametype.dto';

export class UpdateFrameTypeDto extends PartialType(CreateFrameTypeDto) { }
