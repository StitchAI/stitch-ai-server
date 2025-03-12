import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDateString, IsObject, IsString } from 'class-validator';

export type MemorySpace = {
  id: string;
  name: string;

  createdAt: Date;
  updatedAt: Date;
};

export class MemorySpaceDto implements MemorySpace {
  @ApiProperty({
    description: '메모리 공간 id',
    example: '300d01f3a910045fefa16d6a149f38167b2503dbc37c1b24fd6f751e',
  })
  @IsString()
  id: string;

  @ApiProperty({ description: '메모리 공간 이름', example: 'memory-space-1' })
  @IsString()
  name: string;

  @ApiProperty({ description: '메모리 공간 생성 시간', example: '2021-01-01T00:00:00.000Z' })
  @IsDateString()
  createdAt: Date;

  @ApiProperty({ description: '메모리 공간 수정 시간', example: '2021-01-01T00:00:00.000Z' })
  @IsDateString()
  updatedAt: Date;
}

export type MemoryData = {
  character: string;
  episodic: string;
};
export class MemoryDataDto implements MemoryData {
  @ApiProperty({ description: '캐릭터 메모리', example: '캐릭터 메모리' })
  @IsString()
  character: string;

  @ApiProperty({ description: '에피소드 메모리', example: '에피소드 메모리' })
  @IsString()
  episodic: string;
}

export type Memory = {
  id: string;

  spaceId: string;
  space: MemorySpace;

  ownerId: string;

  message: string;
  data: MemoryData;

  createdAt: Date;
  updatedAt: Date;
};

export class MemoryDto implements Memory {
  @ApiProperty({
    description: '메모리 id',
    example: 'f3ff4f073ed24d62051c8d7bb73418b95db2f6ff9e4441af466f6d98',
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: '메모리 공간 id',
    example: '300d01f3a910045fefa16d6a149f38167b2503dbc37c1b24fd6f751e',
  })
  @IsString()
  spaceId: string;

  @ApiProperty({ description: '메모리 공간', type: MemorySpaceDto })
  @IsObject()
  space: MemorySpaceDto;

  @ApiProperty({
    description: '메모리 소유자 지갑 주소',
    example: '0x1234567890123456789012345678901234567890',
  })
  @IsString()
  ownerId: string;

  @ApiProperty({ description: '메모리 commit 메시지', example: 'this is a test memory' })
  @IsString()
  message: string;

  @ApiProperty({ description: '메모리 데이터', type: MemoryDataDto })
  data: MemoryDataDto;

  @ApiProperty({ description: '메모리 생성 시간', example: '2021-01-01T00:00:00.000Z' })
  @IsDateString()
  createdAt: Date;

  @ApiProperty({ description: '메모리 수정 시간', example: '2021-01-01T00:00:00.000Z' })
  @IsDateString()
  updatedAt: Date;
}

export type MemorySpaceWithMemories = MemorySpace & {
  memories: Memory[];
};

export class MemorySpaceWithMemoriesDto extends MemorySpaceDto {
  @ApiProperty({ description: '메모리 공간 메모리 목록', type: [MemoryDto] })
  @IsArray()
  memories: MemoryDto[];
}

export type ExternalMemory = {
  id: string;

  operator: string;
  operatorLogo: string;

  name: string;
  message: string;

  data: string;

  ownerId: string;

  createdAt: Date;
  updatedAt: Date;
};

export class ExternalMemoryDto implements ExternalMemory {
  @ApiProperty({
    description: '외부 메모리 id',
    example: 'f3ff4f073ed24d62051c8d7bb73418b95db2f6ff9e4441af466f6d98',
  })
  @IsString()
  id: string;

  @ApiProperty({ description: '외부 메모리 운영자', example: 'Nansen' })
  @IsString()
  operator: string;

  @ApiProperty({ description: '외부 메모리 운영자 로고', example: 'https://example.com/logo.png' })
  @IsString()
  operatorLogo: string;

  @ApiProperty({ description: '외부 메모리 이름', example: 'This is a test memory' })
  @IsString()
  name: string;

  @ApiProperty({ description: '외부 메모리 메시지', example: 'this is a test memory' })
  @IsString()
  message: string;

  @ApiProperty({ description: '외부 메모리 데이터', example: 'this is a test memory' })
  @IsString()
  data: string;

  @ApiProperty({
    description: '외부 메모리 소유자 지갑 주소',
    example: '0x1234567890123456789012345678901234567890',
  })
  @IsString()
  ownerId: string;

  @ApiProperty({ description: '외부 메모리 생성 시간', example: '2021-01-01T00:00:00.000Z' })
  @IsDateString()
  createdAt: Date;

  @ApiProperty({ description: '외부 메모리 수정 시간', example: '2021-01-01T00:00:00.000Z' })
  @IsDateString()
  updatedAt: Date;
}
