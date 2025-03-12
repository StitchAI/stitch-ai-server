import { Injectable } from '@nestjs/common';

import { generateApiKey } from '~/libs/api-key';
import { PrismaService } from '~/prisma/services/prisma.service';

import { GetUserResDto } from '../dtos/user.dto';
import { GetUserReqQueryDto } from '../dtos/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUser(query: GetUserReqQueryDto): Promise<GetUserResDto> {
    const user = await this.prisma.user.findUnique({
      where: {
        walletAddress: query.walletAddress,
      },
    });

    if (!user) {
      const newUser = await this.prisma.user.create({
        data: {
          walletAddress: query.walletAddress,
          apiKey: generateApiKey(query.walletAddress),
        },
      });

      return newUser;
    }

    return user;
  }
}
