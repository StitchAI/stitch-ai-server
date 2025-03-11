import { Module } from '@nestjs/common';

import { PrismaModule } from '~/prisma/prisma.module';

import { MarketplaceController } from './controllers/marketplace.controller';
import { MarketplaceService } from './services/marketplace.service';

@Module({
  imports: [PrismaModule],
  controllers: [MarketplaceController],
  providers: [MarketplaceService],
  exports: [MarketplaceService],
})
export class MarketplaceModule {}
