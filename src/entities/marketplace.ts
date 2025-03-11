import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

import { ExternalMemory, ExternalMemoryDto, Memory, MemoryDto } from './memory';
import { User, UserDto } from './user';

export type MarketListing = {
  id: string;

  price: number;
  priceWei: string;

  active: boolean;

  internalId: string;
  txHash: string;
  memoryType: string;

  memoryId?: string;
  memory?: Omit<Memory, 'data'>;

  externalMemoryId?: string;
  externalMemory?: Omit<ExternalMemory, 'data'>;

  sellerId: string;
  seller: Omit<User, 'apiKey'>;

  createdAt: Date;
  updatedAt: Date;
};

export class MarketListingDto implements MarketListing {
  @ApiProperty({ description: '마켓 목록 id', example: '123' })
  @IsString()
  id: string;

  @ApiProperty({ description: '마켓 목록 가격', example: 100 })
  @IsNumber()
  price: number;

  @ApiProperty({ description: '마켓 목록 가격 (wei, decimal 6)', example: '100000000' })
  @IsString()
  priceWei: string;

  @ApiProperty({ description: '마켓 목록 활성화 여부', example: true })
  @IsBoolean()
  active: boolean;

  @ApiProperty({ description: '마켓 contract에서 생성된 목록 id', example: '1' })
  @IsString()
  internalId: string;

  @ApiProperty({
    description: '마켓 목록 트랜잭션 해시',
    example: '0x1234567890123456789012345678901234567890',
  })
  @IsString()
  txHash: string;

  @ApiProperty({ description: '마켓 목록 메모리 타입', example: '0' })
  @IsString()
  memoryType: string;

  @ApiProperty({
    description:
      'memory id (optional). 마켓에 올린 메모리 타입에 따라 메모리 또는 external 메모리 id 중 하나가 존재',
    example: 'f3ff4f073ed24d62051c8d7bb73418b95db2f6ff9e4441af466f6d98',
    required: false,
  })
  @IsOptional()
  @IsString()
  memoryId?: string;

  @ApiProperty({ description: '마켓 목록 메모리', type: MemoryDto, required: false })
  @IsOptional()
  @IsObject()
  memory?: Omit<MemoryDto, 'data'>;

  @ApiProperty({
    description:
      'external 메모리 id (optional). 마켓에 올린 메모리 타입에 따라 메모리 또는 external 메모리 id 중 하나가 존재',
    example: 'f3ff4f073ed24d62051c8d7bb73418b95db2f6ff9e4441af466f6d98',
    required: false,
  })
  @IsOptional()
  @IsString()
  externalMemoryId?: string;

  @ApiProperty({ description: '마켓 목록 외부 메모리', type: ExternalMemoryDto, required: false })
  @IsOptional()
  @IsObject()
  externalMemory?: Omit<ExternalMemoryDto, 'data'>;

  @ApiProperty({
    description: '마켓 목록 판매자 지갑 주소',
    example: '0x1234567890123456789012345678901234567890',
  })
  @IsString()
  sellerId: string;

  @ApiProperty({ description: '판매자', type: UserDto })
  @IsObject()
  seller: Omit<UserDto, 'apiKey'>;

  @ApiProperty({ description: '마켓 목록 생성 시간', example: '2021-01-01T00:00:00.000Z' })
  @IsDateString()
  createdAt: Date;

  @ApiProperty({ description: '마켓 목록 수정 시간', example: '2021-01-01T00:00:00.000Z' })
  @IsDateString()
  updatedAt: Date;
}
