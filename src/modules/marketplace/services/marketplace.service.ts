import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Address, isAddressEqual, parseUnits } from 'viem';

import { BaseHeaderDto } from '~/dtos/request.dto';
import { MarketListing } from '~/entities/marketplace';
import { PrismaService } from '~/prisma/services/prisma.service';

import {
  CreateMarketListingReqBodyDto,
  DelistMarketListingReqParamDto,
} from '../dtos/marketplace.dto';

@Injectable()
export class MarketplaceService {
  constructor(private readonly prisma: PrismaService) {}

  async getMarketListings(): Promise<MarketListing[]> {
    const marketListings = await this.prisma.marketListing.findMany({
      select: {
        id: true,

        price: true,
        priceWei: true,

        active: true,

        internalId: true,
        txHash: true,
        memoryType: true,

        memoryId: true,
        memory: {
          select: {
            id: true,
            spaceId: true,
            ownerId: true,

            message: true,

            createdAt: true,
            updatedAt: true,
          },
        },

        externalMemoryId: true,
        externalMemory: {
          select: {
            id: true,
            operator: true,
            operatorLogo: true,

            name: true,
            message: true,

            ownerId: true,

            createdAt: true,
            updatedAt: true,
          },
        },

        sellerId: true,
        seller: {
          select: {
            walletAddress: true,
            createdAt: true,
            updatedAt: true,
          },
        },

        createdAt: true,
        updatedAt: true,
      },
    });

    return marketListings;
  }

  async createMarketListing(
    header: BaseHeaderDto,
    body: CreateMarketListingReqBodyDto
  ): Promise<void> {
    const { apikey } = header;
    const { price, active, internalId, txHash, memoryType, memoryId, externalMemoryId, sellerId } =
      body;

    const user = await this.prisma.user.findUniqueOrThrow({
      where: { apiKey: apikey },
    });

    if (isAddressEqual(user.walletAddress as Address, sellerId as Address))
      throw new BadRequestException('Seller cannot be the same as the user');

    if (!memoryId && !externalMemoryId)
      throw new BadRequestException('Either memoryId or externalMemoryId must be provided');

    const priceWei = parseUnits(price.toString(), 6);
    await this.prisma.marketListing.create({
      data: {
        price,
        priceWei: priceWei.toString(),

        active,

        memoryType,

        internalId,
        txHash,

        memoryId,
        externalMemoryId,

        sellerId: user.walletAddress,
      },
    });
  }

  async delistMarketListing(
    header: BaseHeaderDto,
    param: DelistMarketListingReqParamDto
  ): Promise<void> {
    const { apikey } = header;
    const { id } = param;

    const user = await this.prisma.user.findUniqueOrThrow({
      where: { apiKey: apikey },
    });

    const marketListing = await this.prisma.marketListing.findUniqueOrThrow({
      where: { id, sellerId: user.walletAddress },
    });
    if (!marketListing) throw new NotFoundException('Market not found');

    await this.prisma.marketListing.update({
      where: { id, sellerId: user.walletAddress },
      data: { active: false },
    });
  }
}
