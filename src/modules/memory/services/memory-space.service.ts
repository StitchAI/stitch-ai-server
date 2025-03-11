import { Injectable } from '@nestjs/common';
import { SHA3 } from 'crypto-js';

import { BaseHeaderDto } from '~/dtos/request.dto';
import { PrismaService } from '~/prisma/services/prisma.service';

import {
  CreateMemorySpaceReqBodyDto,
  CreateMemorySpaceResDto,
  DeleteMemorySpaceReqParamDto,
  GetMemorySpaceResDto,
} from '../dto/memory-space.dto';

@Injectable()
export class MemorySpaceService {
  constructor(private readonly prisma: PrismaService) {}

  async createMemorySpace(
    header: BaseHeaderDto,
    body: CreateMemorySpaceReqBodyDto
  ): Promise<CreateMemorySpaceResDto> {
    const { apiKey } = header;
    const { name } = body;

    const hash = SHA3(`${apiKey}_${name}_${Date.now()}`, { outputLength: 256 }).toString();

    const user = await this.prisma.user.findUniqueOrThrow({
      where: { apiKey },
    });
    const created = await this.prisma.memorySpace.create({
      data: {
        id: hash,
        name,
        ownerId: user.walletAddress,
      },
    });

    return { id: created.id, name: created.name };
  }

  async getMemorySpace(header: BaseHeaderDto): Promise<GetMemorySpaceResDto> {
    const { apiKey } = header;

    const user = await this.prisma.user.findUniqueOrThrow({
      where: { apiKey },
    });

    const memorySpaces = await this.prisma.memorySpace.findMany({
      where: { ownerId: user.walletAddress },
    });

    const data = memorySpaces.map(memorySpace => ({
      id: memorySpace.id,
      name: memorySpace.name,

      createdAt: memorySpace.createdAt,
      updatedAt: memorySpace.updatedAt,
    }));

    return { data };
  }

  async deleteMemorySpace(
    header: BaseHeaderDto,
    param: DeleteMemorySpaceReqParamDto
  ): Promise<void> {
    const { apiKey } = header;
    const { name } = param;

    const user = await this.prisma.user.findUniqueOrThrow({
      where: { apiKey },
    });

    await this.prisma.memorySpace.delete({
      where: { ownerId_name: { ownerId: user.walletAddress, name } },
    });
  }
}
