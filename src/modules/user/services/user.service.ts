import { Injectable } from '@nestjs/common';

import { BaseHeaderDto } from '~/dtos/request.dto';
import { generateApiKey } from '~/libs/api-key';
import { PrismaService } from '~/prisma/services/prisma.service';

import { GetUserResDto } from '../dtos/user.dto';
import { GetUserReqQueryDto } from '../dtos/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUser(header: BaseHeaderDto, query: GetUserReqQueryDto): Promise<GetUserResDto> {
    const { apikey } = header;
    const user = await this.prisma.user.findUnique({
      where: {
        walletAddress_apiKey: {
          walletAddress: query.walletAddress,
          apiKey: apikey,
        },
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
