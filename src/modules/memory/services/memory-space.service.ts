import { Injectable } from '@nestjs/common';
import { SHA3 } from 'crypto-js';

import { PrismaService } from '~/prisma/services/prisma.service';

import {
  CreateMemorySpaceReqBodyDto,
  CreateMemorySpaceResDto,
  DeleteMemorySpaceReqParamDto,
  GetMemorySpaceResDto,
} from '../dtos/memory-space.dto';

@Injectable()
export class MemorySpaceService {
  constructor(private readonly prisma: PrismaService) {}

  async createMemorySpace(
    apikey: string,
    body: CreateMemorySpaceReqBodyDto
  ): Promise<CreateMemorySpaceResDto> {
    const { name } = body;

    const hash = SHA3(`${apikey}_${name}_${Date.now()}`, { outputLength: 256 }).toString();

    const user = await this.prisma.user.findUniqueOrThrow({
      where: { apiKey: apikey },
    });
    const created = await this.prisma.memorySpace.create({
      data: {
        id: hash,
        name,
        ownerId: user.walletAddress.toLowerCase(),
      },
    });

    return { id: created.id, name: created.name };
  }

  async getMemorySpaces(apikey: string): Promise<GetMemorySpaceResDto> {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { apiKey: apikey },
    });

    const memorySpaces = await this.prisma.memorySpace.findMany({
      where: { ownerId: user.walletAddress.toLowerCase() },
    });

    const data = memorySpaces.map(memorySpace => ({
      id: memorySpace.id,
      name: memorySpace.name,

      createdAt: memorySpace.createdAt,
      updatedAt: memorySpace.updatedAt,
    }));

    return { data };
  }

  async deleteMemorySpace(apikey: string, param: DeleteMemorySpaceReqParamDto): Promise<void> {
    const { name } = param;

    const user = await this.prisma.user.findUniqueOrThrow({
      where: { apiKey: apikey },
    });

    await this.prisma.memorySpace.delete({
      where: { ownerId_name: { ownerId: user.walletAddress, name } },
    });
  }
}
