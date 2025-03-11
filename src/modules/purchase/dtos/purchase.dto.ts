import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreatePurchaseReqBodyDto {
  @ApiProperty({ description: '구매자 지갑 주소' })
  @IsString()
  buyerId: string;

  @ApiProperty({ description: '마켓 목록 id' })
  @IsString()
  listingId: string;

  @ApiProperty({ description: '마켓 contract에서 생성된 목록 id' })
  @IsString()
  internalListingId: string;

  @ApiProperty({ description: '구매 트랜잭션 해시' })
  @IsString()
  txHash: string;

  @ApiProperty({ description: '마켓 목록 가격' })
  @IsNumber()
  price: number;
}
