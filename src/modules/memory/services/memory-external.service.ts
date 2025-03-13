import { Injectable } from '@nestjs/common';
import { SHA3 } from 'crypto-js';
import { Address, isAddressEqual } from 'viem';

import { BaseHeaderDto } from '~/dtos/request.dto';
import { ExternalMemoryDto } from '~/entities/memory';
import { PrismaService } from '~/prisma/services/prisma.service';

import {
  CreateExternalMemoryReqBodyDto,
  CreateExternalMemoryResDto,
  GetExternalMemoryReqParamDto,
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
        ownerId: user.walletAddress.toLowerCase(),
      },
    });

    return { id: created.id };
  }

  async getExternalMemory(
    header: BaseHeaderDto,
    param: GetExternalMemoryReqParamDto
  ): Promise<ExternalMemoryDto> {
    const { apikey } = header;
    const { id } = param;

    const user = await this.prisma.user.findUniqueOrThrow({
      where: { apiKey: apikey },
      include: {
        purchases: {
          include: {
            listing: true,
          },
        },
      },
    });

    const isPurchased = user.purchases.find(purchase => {
      const buyerCheck = isAddressEqual(purchase.buyerId as Address, user.walletAddress as Address);
      const listingCheck = purchase.listing.externalMemoryId === id;

      return buyerCheck && listingCheck;
    });
    if (!isPurchased) {
      throw new Error('You have not purchased this memory');
    }

    const memory = await this.prisma.externalMemory.findUniqueOrThrow({
      where: { id },
      select: {
        id: true,

        operator: true,
        operatorLogo: true,

        name: true,
        message: true,

        data: true,

        ownerId: true,

        createdAt: true,
        updatedAt: true,
      },
    });

    return memory;
  }
}
