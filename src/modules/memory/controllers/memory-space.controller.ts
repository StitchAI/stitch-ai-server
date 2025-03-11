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
    @Headers() headers: BaseHeaderDto,
    @Body() body: CreateMemorySpaceReqBodyDto
  ): Promise<CreateMemorySpaceResDto> {
    return this.memorySpaceService.createMemorySpace(headers, body);
  }

  @Get('spaces')
  @ApiOperation({ summary: '메모리 공간 목록 조회' })
  @ApiResponse({
    status: 200,
    description: '메모리 공간 목록 반환',
    type: GetMemorySpaceResDto,
  })
  async getMemorySpaces(@Headers() headers: BaseHeaderDto): Promise<GetMemorySpaceResDto> {
    return this.memorySpaceService.getMemorySpaces(headers);
  }

  @Delete('space/:name')
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
