import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsObject, IsString } from 'class-validator';

import { MarketListing, MarketListingDto } from './marketplace';
import { User, UserDto } from './user';

export type Purchase = {
  id: string;

  listingId: string;
  listing: MarketListing;

  buyerId: string;
  buyer: User;

  price: number;

  createdAt: Date;
  updatedAt: Date;
};

export class PurchaseDto implements Purchase {
  @ApiProperty({ description: '구매 id', example: '123' })
  @IsString()
  id: string;

  @ApiProperty({ description: '마켓 목록 id', example: '123' })
  @IsString()
  listingId: string;

  @ApiProperty({ description: '마켓 목록', type: MarketListingDto })
  @IsObject()
  listing: MarketListingDto;

  @ApiProperty({
    description: '구매자 지갑 주소',
    example: '0x1234567890123456789012345678901234567890',
  })
  @IsString()
  buyerId: string;

  @ApiProperty({ description: '구매자', type: UserDto })
  @IsObject()
  buyer: UserDto;

  @ApiProperty({ description: '구매 가격', example: 100 })
  @IsNumber()
  price: number;

  @ApiProperty({ description: '구매 시간', example: '2021-01-01T00:00:00.000Z' })
  @IsDateString()
  createdAt: Date;

  @ApiProperty({ description: '구매 시간', example: '2021-01-01T00:00:00.000Z' })
  @IsDateString()
  updatedAt: Date;
}
