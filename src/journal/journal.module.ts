import { Module } from '@nestjs/common';
import { JournalController } from './journal.controller';
import { JournalService } from './journal.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Journal } from './entities/journal.entity';
import { JournalItem } from './entities/journal-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Journal, JournalItem])],
  controllers: [JournalController],
  providers: [JournalService]
})
export class JournalModule {}
