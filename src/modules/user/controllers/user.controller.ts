import { Controller, Get, Headers, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { BaseHeaderDto } from '~/dtos/request.dto';

import { GetUserResDto } from '../dtos/user.dto';
import { GetUserReqQueryDto } from '../dtos/user.dto';
import { UserService } from '../services/user.service';

@ApiTags('USER')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: '유저 조회', description: '유저 조회. 유저가 없는 경우 생성' })
  @ApiResponse({ type: GetUserResDto })
  async getUser(
    @Headers() headers: BaseHeaderDto,
    @Query() query: GetUserReqQueryDto
  ): Promise<GetUserResDto> {
    return this.userService.getUser(headers, query);
  }
}
