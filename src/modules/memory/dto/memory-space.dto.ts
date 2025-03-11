import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

import { MemorySpaceDto } from '~/entities/memory';

export class CreateMemorySpaceReqBodyDto {
  @IsString()
  @ApiProperty({ description: '메모리 공간 이름', example: 'memory-space-1' })
  name: string;
}

export class CreateMemorySpaceResDto {
  @ApiProperty({
    description: '메모리 공간 id',
    example: '300d01f3a910045fefa16d6a149f38167b2503dbc37c1b24fd6f751e',
  })
  @IsString()
  id: string;

  @ApiProperty({ description: '메모리 공간 이름', example: 'memory-space-1' })
  @IsString()
  name: string;
}

export class GetMemorySpaceResDto {
  @IsArray()
  @ApiProperty({ description: '메모리 공간 목록', type: [MemorySpaceDto] })
  data: MemorySpaceDto[];
}

export class DeleteMemorySpaceReqParamDto {
  @IsString()
  @ApiProperty({ description: '메모리 공간 이름', example: 'memory-space-1' })
  name: string;
}
