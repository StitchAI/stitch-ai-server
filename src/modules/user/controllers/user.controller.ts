import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PublicCorsInterceptor } from '~/interceptors/cors.interceptor';

import { GetUserResDto } from '../dtos/user.dto';
import { GetUserReqQueryDto } from '../dtos/user.dto';
import { UserService } from '../services/user.service';

@ApiTags('USER')
@UseInterceptors(PublicCorsInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: '유저 조회', description: '유저 조회. 유저가 없는 경우 생성' })
  @ApiResponse({ type: GetUserResDto })
  async getUser(@Query() query: GetUserReqQueryDto): Promise<GetUserResDto> {
    return this.userService.getUser(query);
  }
}
