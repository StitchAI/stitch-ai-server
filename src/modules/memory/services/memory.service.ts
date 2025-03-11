import { Injectable } from '@nestjs/common';
import { SHA3 } from 'crypto-js';

import { BaseHeaderDto } from '~/dtos/request.dto';
import { MemoryData } from '~/entities/memory';
import { PrismaService } from '~/prisma/services/prisma.service';

import {
  GetMemoriesInSpaceReqParamDto,
  GetMemoriesInSpaceResDto,
  UploadMemoryReqBodyDto,
  UploadMemoryReqParamDto,
  UploadMemoryResDto,
} from '../dto/memory.dto';

@Injectable()
export class MemoryService {
  constructor(private readonly prisma: PrismaService) {}

  async uploadMemory(
    header: BaseHeaderDto,
    param: UploadMemoryReqParamDto,
    body: UploadMemoryReqBodyDto
  ): Promise<UploadMemoryResDto> {
    const { apiKey } = header;
    const { space } = param;
    const { message, episodicMemory, characterMemory } = body;

    const hash = SHA3(`${apiKey}_${space}_${message}_${Date.now()}`, {
      outputLength: 256,
    }).toString();

    const user = await this.prisma.user.findUniqueOrThrow({
      where: { apiKey },
    });
    const memorySpace = await this.prisma.memorySpace.findUniqueOrThrow({
      where: {
        ownerId_name: {
          ownerId: user.walletAddress,
          name: space,
        },
      },
    });

    const created = await this.prisma.memory.create({
      data: {
        id: hash,
        message,
        data: {
          episodic: episodicMemory,
          character: characterMemory,
        },
        spaceId: memorySpace.id,
      },
    });

    return {
      id: created.id,
      message: created.message,

      space: memorySpace.name,
    };
  }

  async getMemoriesInSpace(
    header: BaseHeaderDto,
    param: GetMemoriesInSpaceReqParamDto
  ): Promise<GetMemoriesInSpaceResDto> {
    const { apiKey } = header;
    const { space } = param;

    const user = await this.prisma.user.findUniqueOrThrow({
      where: { apiKey },
    });
    const memorySpace = await this.prisma.memorySpace.findUniqueOrThrow({
      where: {
        ownerId_name: { ownerId: user.walletAddress, name: space },
      },
      select: {
        name: true,

        memories: {
          orderBy: {
            createdAt: 'desc',
          },
          select: {
            id: true,
            spaceId: true,
            message: true,
            data: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    if (memorySpace.memories.length === 0) {
      return {
        name: memorySpace.name,
        memory: null,
        histories: [],
      };
    }

    const currentMemory = {
      ...memorySpace.memories[0],
      data: (memorySpace.memories[0].data || { character: '', episodic: '' }) as MemoryData,
    };
    const histories = memorySpace.memories.map(memory => ({
      ...memory,
      data: (memory.data || { character: '', episodic: '' }) as MemoryData,
    }));

    return {
      name: memorySpace.name,
      memory: currentMemory,
      histories,
    };
  }
}
