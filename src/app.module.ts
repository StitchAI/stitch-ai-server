import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import { MarketplaceModule } from './modules/marketplace/marketplace.module';
import { MemoryModule } from './modules/memory/memory.module';
import { PurchaseModule } from './modules/purchase/purchase.module';
import { UserModule } from './modules/user/user.module';
import { Web3ClientModule } from './modules/web3-client/web3-client.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    ScheduleModule.forRoot(),

    UserModule,
    MemoryModule,
    PurchaseModule,
    MarketplaceModule,

    Web3ClientModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
