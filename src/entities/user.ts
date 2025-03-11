import { ApiProperty } from '@nestjs/swagger';
import { ExternalMemory } from '@prisma/client';
import { IsDateString, IsString } from 'class-validator';

import { ExternalMemoryDto, MemorySpace, MemorySpaceDto } from './memory';

export type User = {
  walletAddress: string;

  apiKey: string;

  createdAt: Date;
  updatedAt: Date;
};

export type UserWithMemory = User & {
  memorySpaces: MemorySpace[];
  externalMemories: ExternalMemory[];
};

export class UserDto implements User {
  @ApiProperty({
    description: '유저 지갑 주소',
    example: '0x1234567890123456789012345678901234567890',
  })
  @IsString()
  walletAddress: string;

  @ApiProperty({ description: '유저 API 키', example: '12345678-90123456' })
  @IsString()
  apiKey: string;

  @ApiProperty({ description: '유저 생성 시간', example: '2021-01-01T00:00:00.000Z' })
  @IsDateString()
  createdAt: Date;

  @ApiProperty({ description: '유저 수정 시간', example: '2021-01-01T00:00:00.000Z' })
  @IsDateString()
  updatedAt: Date;
}

export class UserWithMemoryDto extends UserDto {
  @ApiProperty({ description: '유저 메모리 공간 목록', type: [MemorySpaceDto] })
  memorySpaces: MemorySpaceDto[];

  @ApiProperty({ description: '유저 External 메모리 목록', type: [ExternalMemoryDto] })
  externalMemories: ExternalMemoryDto[];
}
