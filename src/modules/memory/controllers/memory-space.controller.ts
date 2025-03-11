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

import { BaseHeaderDto } from '~/dtos/request.dto';
import { PublicCorsInterceptor } from '~/interceptors/cors.interceptor';

import {
  CreateMemorySpaceReqBodyDto,
  CreateMemorySpaceResDto,
  DeleteMemorySpaceReqParamDto,
  GetMemorySpaceResDto,
} from '../dtos/memory-space.dto';
import { MemorySpaceService } from '../services/memory-space.service';

@ApiTags('MEMORY')
@Controller('memory')
export class MemorySpaceController {
  constructor(private readonly memorySpaceService: MemorySpaceService) {}

  @Post('space')
  @UseInterceptors(PublicCorsInterceptor)
  @ApiOperation({ summary: '메모리 공간 생성' })
  @ApiResponse({
    status: 200,
    description: '메모리 공간 생성 성공',
    type: CreateMemorySpaceResDto,
  })
  async createMemorySpace(
    @Headers() headers: BaseHeaderDto,
    @Body() body: CreateMemorySpaceReqBodyDto
  ): Promise<CreateMemorySpaceResDto> {
    return this.memorySpaceService.createMemorySpace(headers, body);
  }

  @Get('space')
  @UseInterceptors(PublicCorsInterceptor)
  @ApiOperation({ summary: '메모리 공간 목록 조회' })
  @ApiResponse({
    status: 200,
    description: '메모리 공간 목록 반환',
    type: GetMemorySpaceResDto,
  })
  async getMemorySpace(@Headers() headers: BaseHeaderDto): Promise<GetMemorySpaceResDto> {
    return this.memorySpaceService.getMemorySpace(headers);
  }

  @Delete('space/:name')
  @UseInterceptors(PublicCorsInterceptor)
  @ApiOperation({ summary: '메모리 공간 삭제' })
  @ApiResponse({
    status: 200,
    description: '메모리 공간 삭제 성공',
  })
  async deleteMemorySpace(
    @Headers() headers: BaseHeaderDto,
    @Param() param: DeleteMemorySpaceReqParamDto
  ): Promise<void> {
    return this.memorySpaceService.deleteMemorySpace(headers, param);
  }
}
