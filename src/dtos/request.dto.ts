import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class BaseHeaderDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'API 키. 테스트 키는 `demo-[walletAddress]`' })
  apiKey: string;
}
