import { Module } from '@nestjs/common';
import { BulkMessageService } from './bulk-message.service';
import { BulkMessageController } from './bulk-message.controller';

@Module({
  providers: [BulkMessageService],
  controllers: [BulkMessageController]
})
export class BulkMessageModule {}
