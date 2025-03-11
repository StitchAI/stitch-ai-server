import { Injectable } from '@nestjs/common';
import { SHA3 } from 'crypto-js';

import { BaseHeaderDto } from '~/dtos/request.dto';
import { PrismaService } from '~/prisma/services/prisma.service';

import {
  CreateExternalMemoryReqBodyDto,
  CreateExternalMemoryResDto,
} from '../dtos/memory-external.dto';

@Injectable()
export class MemoryExternalService {
  constructor(private readonly prisma: PrismaService) {}

  async createExternalMemory(
    header: BaseHeaderDto,
    body: CreateExternalMemoryReqBodyDto
  ): Promise<CreateExternalMemoryResDto> {
    const { apikey } = header;
    const { operator, operatorLogo, name, message, data } = body;

    const user = await this.prisma.user.findUniqueOrThrow({
      where: { apiKey: apikey },
    });

    const hash = SHA3(`${apikey}_${name}_${message}_${Date.now()}`, {
      outputLength: 256,
    }).toString();

    const created = await this.prisma.externalMemory.create({
      data: {
        id: hash,
        operator,
        operatorLogo,
        name,
        message,
        data,
        ownerId: user.walletAddress,
      },
    });

    return { id: created.id };
  }
}
