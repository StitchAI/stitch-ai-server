import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsObject, IsOptional, IsString } from 'class-validator';

import { MemoryDto } from '~/entities/memory';

export class UploadMemoryReqParamDto {
  @IsString()
  @ApiProperty({
    description: '메모리 공간 이름',
    example: 'memory-space-1',
  })
  space: string;
}

export class UploadMemoryReqBodyDto {
  @IsString()
  @ApiProperty({ description: '메모리 메시지', example: 'this is a test memory' })
  message: string;

  @IsString()
  @ApiProperty({ description: '에피소드 메모리', example: 'this is a test episodic memory' })
  episodicMemory: string;

  @IsString()
  @ApiProperty({ description: '캐릭터 메모리', example: 'this is a test character memory' })
  characterMemory: string;
}

export class UploadMemoryResDto {
  @IsString()
  @ApiProperty({
    description: '메모리 id',
    example: 'f3ff4f073ed24d62051c8d7bb73418b95db2f6ff9e4441af466f6d98',
  })
  id: string;

  @IsString()
  @ApiProperty({ description: '메모리 메시지', example: 'this is a test memory' })
  message: string;

  @IsString()
  @ApiProperty({ description: '메모리 공간 이름', example: 'memory-space-1' })
  space: string;
}

export class GetMemoriesInSpaceReqParamDto {
  @IsString()
  @ApiProperty({
    description: '메모리 공간 이름',
    example: 'memory-space-1',
  })
  space: string;
}

export class GetMemoriesInSpaceResDto {
  @IsString()
  @ApiProperty({ description: '메모리 공간 이름', example: 'memory-space-1' })
  name: string;

  @IsObject()
  @IsOptional()
  @ApiProperty({ description: '메모리', type: MemoryDto, required: false })
  memory: MemoryDto;

  @IsArray()
  @IsOptional()
  @ApiProperty({ description: '메모리 히스토리', type: [MemoryDto], required: false })
  histories: MemoryDto[];
}

export class GetMemoryReqParamDto {
  @IsString()
  @ApiProperty({ description: '메모리 공간 이름', example: 'memory-space-1' })
  space: string;

  @IsString()
  @ApiProperty({
    description: '메모리 id',
    example: 'f3ff4f073ed24d62051c8d7bb73418b95db2f6ff9e4441af466f6d98',
  })
  id: string;
}
