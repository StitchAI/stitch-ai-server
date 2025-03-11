import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMarketListingReqBodyDto {
  @ApiProperty({ description: '마켓 목록 가격', example: 100 })
  @IsNumber()
  price: number;

  @ApiProperty({ description: '마켓 목록 활성화 여부', example: true })
  @IsBoolean()
  active: boolean;

  @ApiProperty({
    description: '마켓 목록 메모리 타입, 0: 에이전트 메모리, 1: 외부 메모리',
    example: '0',
  })
  @IsString()
  memoryType: string;

  @ApiProperty({ description: '마켓 목록 컨트랙트 id', example: '0' })
  @IsString()
  internalId: string;

  @ApiProperty({
    description: '마켓 목록 트랜잭션 해시',
    example: '0x1234567890123456789012345678901234567890',
  })
  @IsString()
  txHash: string;

  @ApiProperty({
    description: '마켓 목록 메모리 id',
    example: 'f3ff4f073ed24d62051c8d7bb73418b95db2f6ff9e4441af466f6d98',
    required: false,
  })
  @IsOptional()
  @IsString()
  memoryId?: string;

  @ApiProperty({
    description: '마켓 목록 외부 메모리 id',
    example: 'f3ff4f073ed24d62051c8d7bb73418b95db2f6ff9e4441af466f6d98',
    required: false,
  })
  @IsOptional()
  @IsString()
  externalMemoryId?: string;

  @ApiProperty({
    description: '마켓 목록 판매자 id',
    example: '0x1234567890123456789012345678901234567890',
  })
  @IsString()
  sellerId: string;
}

export class DelistMarketListingReqBodyDto {
  @ApiProperty({
    description: '마켓 목록 id',
    example: 'f3ff4f073ed24d62051c8d7bb73418b95db2f6ff9e4441af466f6d98',
  })
  @IsString()
  id: string;
}
