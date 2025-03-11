import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class BaseHeaderDto {
  @IsString()
  @ApiProperty({ description: 'API 키. 테스트 키는 `demo-[walletAddress]`' })
  apikey: string;
}
