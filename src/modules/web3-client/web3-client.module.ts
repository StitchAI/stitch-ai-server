import { Global, Module } from '@nestjs/common';

import { Web3ClientBscService } from './services/web3-client.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [Web3ClientBscService],
  exports: [Web3ClientBscService],
})
export class Web3ClientModule {}
