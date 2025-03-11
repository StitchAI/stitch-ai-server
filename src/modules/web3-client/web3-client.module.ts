import { Global, Module } from '@nestjs/common';

import { Web3ClientMonadService } from './services/web3-client.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [Web3ClientMonadService],
  exports: [Web3ClientMonadService],
})
export class Web3ClientModule {}
