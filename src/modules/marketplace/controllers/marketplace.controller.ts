import { Body, Controller, Get, Headers, Param, Post, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { BaseDto } from '~/dtos/request.dto';
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
    @Headers() headers: BaseDto,
    @Param() param: BaseDto,
    @Body() body: CreateMarketListingReqBodyDto
  ): Promise<void> {
    const { apikey: apikeyFromHeader } = headers;
    const { apikey: apikeyFromParam } = param;
    const apikey = apikeyFromHeader || apikeyFromParam;

    return this.marketplaceService.createMarketListing(apikey, body);
  }

  @Post('delist')
  @ApiOperation({ summary: '마켓 판매 목록 비활성화' })
  @ApiResponse({
    status: 200,
    description: '마켓 판매 목록 비활성화 성공, void 반환',
  })
  async delistMarketListing(
    @Headers() headers: BaseDto,
    @Param() param: BaseDto,
    @Body() body: DelistMarketListingReqBodyDto
  ): Promise<void> {
    const { apikey: apikeyFromHeader } = headers;
    const { apikey: apikeyFromParam } = param;
    const apikey = apikeyFromHeader || apikeyFromParam;

    return this.marketplaceService.delistMarketListing(apikey, body);
  }
}
