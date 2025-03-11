import { Body, Controller, Get, Headers, Param, Post, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { BaseHeaderDto } from '~/dtos/request.dto';
import { MemoryDto } from '~/entities/memory';
import { PublicCorsInterceptor } from '~/interceptors/cors.interceptor';

import {
  GetMemoriesInSpaceReqParamDto,
  GetMemoriesInSpaceResDto,
  GetMemoryReqParamDto,
  UploadMemoryReqBodyDto,
  UploadMemoryReqParamDto,
  UploadMemoryResDto,
} from '../dtos/memory.dto';
import { MemoryService } from '../services/memory.service';

@ApiTags('MEMORY')
@UseInterceptors(PublicCorsInterceptor)
@Controller('memory')
export class MemoryController {
  constructor(private readonly memoryService: MemoryService) {}

  @Post(':space')
  @ApiOperation({ summary: '메모리 업로드' })
  @ApiResponse({
    status: 200,
    description: '메모리 업로드 성공',
    type: UploadMemoryResDto,
  })
  async uploadMemory(
    @Headers() headers: BaseHeaderDto,
    @Param() param: UploadMemoryReqParamDto,
    @Body() body: UploadMemoryReqBodyDto
  ): Promise<UploadMemoryResDto> {
    return this.memoryService.uploadMemory(headers, param, body);
  }

  @Get(':space')
  @ApiOperation({ summary: '메모리 공간 조회' })
  @ApiResponse({
    status: 200,
    description: '메모리 공간, 메모리, 메모리 히스토리 반환',
    type: GetMemoriesInSpaceResDto,
  })
  async getMemoriesInSpace(
    @Headers() headers: BaseHeaderDto,
    @Param() param: GetMemoriesInSpaceReqParamDto
  ): Promise<GetMemoriesInSpaceResDto> {
    return this.memoryService.getMemoriesInSpace(headers, param);
  }

  @Get(':space/:id')
  @ApiOperation({ summary: '메모리 조회' })
  @ApiResponse({
    status: 200,
    description: '메모리 반환',
    type: GetMemoriesInSpaceResDto,
  })
  async getMemory(
    @Headers() headers: BaseHeaderDto,
    @Param() param: GetMemoryReqParamDto
  ): Promise<MemoryDto> {
    return this.memoryService.getMemory(headers, param);
  }
}
