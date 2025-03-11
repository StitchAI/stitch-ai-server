import { Global, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { createPublicClient, http, PublicClient } from 'viem';
import { monadTestnet } from 'viem/chains';

@Global()
@Injectable()
export class Web3ClientMonadService implements OnModuleInit, OnModuleDestroy {
  constructor() {}

  private client: PublicClient;

  async onModuleInit() {
    const client = createPublicClient({
      batch: {
        multicall: true,
      },
      chain: monadTestnet,
      transport: http(),
    });

    this.client = client as PublicClient;
  }

  onModuleDestroy() {
    this.client = null;
  }

  get(): PublicClient {
    return this.client;
  }
}
