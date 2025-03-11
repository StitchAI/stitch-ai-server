import { Body, Controller, Headers, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { BaseHeaderDto } from '~/dtos/request.dto';

import {
  CreateExternalMemoryReqBodyDto,
  CreateExternalMemoryResDto,
} from '../dtos/memory-external.dto';
import { MemoryExternalService } from '../services/memory-external.service';

@ApiTags('MEMORY')
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
    @Headers() headers: BaseHeaderDto,
    @Body() body: CreateExternalMemoryReqBodyDto
  ): Promise<CreateExternalMemoryResDto> {
    return this.memoryExternalService.createExternalMemory(headers, body);
  }
}
