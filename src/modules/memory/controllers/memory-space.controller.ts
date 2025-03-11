import { Body, Controller, Delete, Get, Headers, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { BaseHeaderDto } from '~/dtos/request.dto';

import {
  CreateMemorySpaceReqBodyDto,
  CreateMemorySpaceResDto,
  DeleteMemorySpaceReqParamDto,
  GetMemorySpaceResDto,
} from '../dto/memory-space.dto';
import { MemorySpaceService } from '../services/memory-space.service';

@ApiTags('MEMORY')
@Controller('memory')
export class MemorySpaceController {
  constructor(private readonly memorySpaceService: MemorySpaceService) {}

  @Post('space')
  @ApiOperation({ summary: '메모리 공간 생성' })
  @ApiResponse({
    status: 200,
    description: 'id, name 반환',
    type: CreateMemorySpaceResDto,
  })
  async createMemorySpace(
    @Headers() headers: BaseHeaderDto,
    @Body() body: CreateMemorySpaceReqBodyDto
  ): Promise<CreateMemorySpaceResDto> {
    return this.memorySpaceService.createMemorySpace(headers, body);
  }

  @Get('space')
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
  @ApiOperation({ summary: '메모리 공간 삭제' })
  @ApiResponse({
    status: 200,
    description: 'void 반환',
  })
  async deleteMemorySpace(
    @Headers() headers: BaseHeaderDto,
    @Param() param: DeleteMemorySpaceReqParamDto
  ): Promise<void> {
    return this.memorySpaceService.deleteMemorySpace(headers, param);
  }
}
