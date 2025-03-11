import { BadRequestException, Injectable } from '@nestjs/common';
import { Address } from 'viem';
import { isAddressEqual } from 'viem';

import { BaseHeaderDto } from '~/dtos/request.dto';
import { Purchase } from '~/entities/purchase';
import { PrismaService } from '~/prisma/services/prisma.service';

import { CreatePurchaseReqBodyDto } from '../dtos/purchase.dto';

@Injectable()
export class PurchaseService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserExternalMemoriesPurchaseList(headers: BaseHeaderDto): Promise<Purchase[]> {
    const { apikey } = headers;
    const user = await this.prisma.user.findUniqueOrThrow({
      where: {
        apiKey: apikey,
      },
    });

    const purchaseList = await this.prisma.purchase.findMany({
      where: {
        buyerId: user.walletAddress,
      },
      select: {
        id: true,

        listingId: true,
        listing: {
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
        },

        internalListingId: true,

        buyerId: true,

        txHash: true,

        price: true,

        createdAt: true,
        updatedAt: true,
      },
    });

    return purchaseList;
  }

  async createPurchase(headers: BaseHeaderDto, body: CreatePurchaseReqBodyDto): Promise<void> {
    const { apikey } = headers;
    const { buyerId, listingId, internalListingId, txHash, price } = body;

    const user = await this.prisma.user.findUniqueOrThrow({
      where: { apiKey: apikey },
    });

    if (isAddressEqual(user.walletAddress as Address, buyerId as Address))
      throw new BadRequestException('Buyer cannot be the same as the user');

    await this.prisma.purchase.create({
      data: {
        buyerId,
        listingId,
        internalListingId,
        txHash,
        price,
      },
    });
  }
}
