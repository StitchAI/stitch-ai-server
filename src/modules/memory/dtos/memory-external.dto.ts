import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsOptional, IsString } from 'class-validator';

export class CreateExternalMemoryReqBodyDto {
  @IsString()
  @ApiProperty({ description: '오퍼레이터 이름', example: 'operator-1' })
  operator: string;

  @IsString()
  @ApiProperty({
    description: '오퍼레이터 로고',
    example: 'https://storage/logo.png',
  })
  operatorLogo: string;

  @IsString()
  @ApiProperty({ description: '메모리 이름', example: 'memory-1' })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: '메모리 메시지', example: 'this is a test memory', required: false })
  message: string;

  @IsObject()
  @ApiProperty({
    description: '메모리 데이터',
    example: 'this is a test memory',
  })
  data: string;
}

export class CreateExternalMemoryResDto {
  @IsString()
  @ApiProperty({
    description: '메모리 id',
    example: 'f3ff4f073ed24d62051c8d7bb73418b95db2f6ff9e4441af466f6d98',
  })
  id: string;
}

export class GetExternalMemoryReqParamDto {
  @IsString()
  @ApiProperty({
    description: '외부 메모리 id',
    example: 'f3ff4f073ed24d62051c8d7bb73418b95db2f6ff9e4441af466f6d98',
  })
  id: string;
}
