import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class BaseDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'API 키. 테스트 키는 `demo-[walletAddress]`' })
  apikey: string;
}
