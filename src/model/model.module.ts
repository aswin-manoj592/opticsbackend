import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Model } from './model.entity';
import { ModelService } from './model.service';
import { ModelController } from './model.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Model]),  // ✅ keep this
  ],
  controllers: [ModelController],
  providers: [ModelService],
  exports: [ModelService], // ✅ ADD THIS (important fix)
})
export class ModelModule {}
