import { Body, Controller, Get, Headers, Post, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { BaseHeaderDto } from '~/dtos/request.dto';
import { PurchaseDto } from '~/entities/purchase';
import { PublicCorsInterceptor } from '~/interceptors/cors.interceptor';

import { CreatePurchaseReqBodyDto } from '../dtos/purchase.dto';
import { PurchaseService } from '../services/purchase.service';

@ApiTags('PURCHASE')
@UseInterceptors(PublicCorsInterceptor)
@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Get()
  @ApiOperation({ summary: '구매 목록 조회' })
  @ApiResponse({
    status: 200,
    description: '구매 목록 조회 성공, 구매 목록 배열 반환',
    type: [PurchaseDto],
  })
  async getUserExternalMemoriesPurchaseList(@Headers() headers: BaseHeaderDto) {
    return this.purchaseService.getUserExternalMemoriesPurchaseList(headers);
  }

  @Post()
  @ApiOperation({ summary: '구매 생성' })
  @ApiResponse({
    status: 200,
    description: '구매 생성 성공, void 반환',
  })
  async createPurchase(@Headers() headers: BaseHeaderDto, @Body() body: CreatePurchaseReqBodyDto) {
    return this.purchaseService.createPurchase(headers, body);
  }
}
