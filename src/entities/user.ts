import { MemorySpace } from './memory';

export type User = {
  walletAddress: string;

  createdAt: Date;
  updatedAt: Date;
};

export type UserWithMemorySpaces = User & {
  memorySpaces: MemorySpace[];
};
