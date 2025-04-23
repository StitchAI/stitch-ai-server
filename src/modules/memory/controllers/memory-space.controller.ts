import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { BaseDto } from '~/dtos/request.dto';
import { PublicCorsInterceptor } from '~/interceptors/cors.interceptor';

import {
  CreateMemorySpaceReqBodyDto,
  CreateMemorySpaceResDto,
  DeleteMemorySpaceReqParamDto,
  GetMemorySpaceResDto,
} from '../dtos/memory-space.dto';
import { MemorySpaceService } from '../services/memory-space.service';

@ApiTags('MEMORY')
@UseInterceptors(PublicCorsInterceptor)
@Controller('memory')
export class MemorySpaceController {
  constructor(private readonly memorySpaceService: MemorySpaceService) {}

  @Post('space')
  @ApiOperation({ summary: '메모리 공간 생성' })
  @ApiResponse({
    status: 200,
    description: '메모리 공간 생성 성공',
    type: CreateMemorySpaceResDto,
  })
  async createMemorySpace(
    @Headers() headers: BaseDto,
    @Param() param: BaseDto,
    @Body() body: CreateMemorySpaceReqBodyDto
  ): Promise<CreateMemorySpaceResDto> {
    const { apikey: apikeyFromHeader } = headers;
    const { apikey: apikeyFromParam } = param;
    const apikey = apikeyFromHeader || apikeyFromParam;

    return this.memorySpaceService.createMemorySpace(apikey, body);
  }

  @Get('spaces')
  @ApiOperation({ summary: '메모리 공간 목록 조회' })
  @ApiResponse({
    status: 200,
    description: '메모리 공간 목록 반환',
    type: GetMemorySpaceResDto,
  })
  async getMemorySpaces(
    @Headers() headers: BaseDto,
    @Param() param: BaseDto
  ): Promise<GetMemorySpaceResDto> {
    const { apikey: apikeyFromHeader } = headers;
    const { apikey: apikeyFromParam } = param;
    const apikey = apikeyFromHeader || apikeyFromParam;

    return this.memorySpaceService.getMemorySpaces(apikey);
  }

  @Delete('space/:name')
  @ApiOperation({ summary: '메모리 공간 삭제' })
  @ApiResponse({
    status: 200,
    description: '메모리 공간 삭제 성공',
  })
  async deleteMemorySpace(
    @Headers() headers: BaseDto,
    @Param() param: DeleteMemorySpaceReqParamDto
  ): Promise<void> {
    const { apikey: apikeyFromHeader } = headers;
    const { apikey: apikeyFromParam } = param;
    const apikey = apikeyFromHeader || apikeyFromParam;

    return this.memorySpaceService.deleteMemorySpace(apikey, param);
  }
}
