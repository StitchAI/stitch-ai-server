import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { BaseDto } from '~/dtos/request.dto';
import { ExternalMemoryDto } from '~/entities/memory';
import { PublicCorsInterceptor } from '~/interceptors/cors.interceptor';

import {
  CreateExternalMemoryReqBodyDto,
  CreateExternalMemoryResDto,
  GetExternalMemoryReqParamDto,
} from '../dtos/memory-external.dto';
import { MemoryExternalService } from '../services/memory-external.service';

@ApiTags('MEMORY')
@UseInterceptors(PublicCorsInterceptor)
@Controller('memory')
export class MemoryExternalController {
  constructor(private readonly memoryExternalService: MemoryExternalService) {}

  @Post('external')
  @ApiOperation({ summary: 'External 메모리 업로드' })
  @ApiResponse({
    status: 200,
    description: 'External 메모리 업로드 성공',
    type: CreateExternalMemoryResDto,
  })
  async createExternalMemory(
    @Headers() headers: BaseDto,
    @Query() query: BaseDto,
    @Body() body: CreateExternalMemoryReqBodyDto
  ): Promise<CreateExternalMemoryResDto> {
    const { apikey: apikeyFromHeader } = headers;
    const { apikey: apikeyFromQuery } = query;
    const apikey = apikeyFromHeader || apikeyFromQuery;

    return this.memoryExternalService.createExternalMemory(apikey, body);
  }

  @Get('external/:id')
  @ApiOperation({ summary: 'External 메모리 조회' })
  @ApiResponse({
    status: 200,
    description: 'External 메모리 조회 성공',
    type: ExternalMemoryDto,
  })
  async getExternalMemory(
    @Headers() headers: BaseDto,
    @Query() query: BaseDto,
    @Param() param: GetExternalMemoryReqParamDto
  ): Promise<ExternalMemoryDto> {
    const { apikey: apikeyFromHeader } = headers;
    const { apikey: apikeyFromQuery } = query;
    const apikey = apikeyFromHeader || apikeyFromQuery;

    return this.memoryExternalService.getExternalMemory(apikey, param);
  }
}
