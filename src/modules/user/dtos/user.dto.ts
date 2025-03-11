import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { UserDto } from '~/entities/user';

export class GetUserReqQueryDto {
  @ApiProperty({
    description: '유저 지갑 주소',
    example: '0x1234567890123456789012345678901234567890',
  })
  @IsString()
  walletAddress: string;
}

export class GetUserResDto extends UserDto {}
