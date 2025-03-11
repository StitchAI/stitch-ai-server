import { Body, Controller, Get, Headers, Post, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { BaseHeaderDto } from '~/dtos/request.dto';
import { MarketListing, MarketListingDto } from '~/entities/marketplace';
import { PublicCorsInterceptor } from '~/interceptors/cors.interceptor';

import {
  CreateMarketListingReqBodyDto,
  DelistMarketListingReqBodyDto,
} from '../dtos/marketplace.dto';
import { MarketplaceService } from '../services/marketplace.service';

@ApiTags('MARKETPLACE')
@UseInterceptors(PublicCorsInterceptor)
@Controller('marketplace')
export class MarketplaceController {
  constructor(private readonly marketplaceService: MarketplaceService) {}

  @Get('list')
  @ApiOperation({ summary: '마켓 판매 목록 조회' })
  @ApiResponse({
    status: 200,
    description: '마켓 판매 목록 조회 성공, 마켓 판매 목록 배열 반환',
    type: [MarketListingDto],
  })
  async getMarketListings(): Promise<MarketListing[]> {
    return this.marketplaceService.getMarketListings();
  }

  @Post('list')
  @ApiOperation({ summary: '마켓 판매 목록 생성' })
  @ApiResponse({
    status: 200,
    description: '마켓 판매 목록 생성 성공, void 반환',
  })
  async createMarketListing(
    @Headers() headers: BaseHeaderDto,
    @Body() body: CreateMarketListingReqBodyDto
  ): Promise<void> {
    return this.marketplaceService.createMarketListing(headers, body);
  }

  @Post('delist')
  @ApiOperation({ summary: '마켓 판매 목록 비활성화' })
  @ApiResponse({
    status: 200,
    description: '마켓 판매 목록 비활성화 성공, void 반환',
  })
  async delistMarketListing(
    @Headers() headers: BaseHeaderDto,
    @Body() body: DelistMarketListingReqBodyDto
  ): Promise<void> {
    return this.marketplaceService.delistMarketListing(headers, body);
  }
}
