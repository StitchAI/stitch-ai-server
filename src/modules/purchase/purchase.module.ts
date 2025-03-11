import { Module } from '@nestjs/common';

import { PrismaModule } from '~/prisma/prisma.module';

import { PurchaseController } from './controllers/purchase.controller';
import { PurchaseService } from './services/purchase.service';

@Module({
  imports: [PrismaModule],
  controllers: [PurchaseController],
  providers: [PurchaseService],
  exports: [PurchaseService],
})
export class PurchaseModule {}
