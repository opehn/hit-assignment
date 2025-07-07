import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from '../common/decorator/role.decorator';
import { User } from '../common/decorator/user.decorator';
import { UserRoles } from '../common/enum/user.enum';
import { MenuCreateDto } from './dto/menu-create.dto';
import { MenuSearchDto } from './dto/menu-search.dto';
import { MenuService } from './menu.service';

@ApiBearerAuth()
@Controller('menus')
@Roles([UserRoles.OWNER])
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: '메뉴 생성' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: '메뉴 생성 성공',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: '잘못된 요청',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: '서버 에러',
  })
  async createMenu(@Body() body: MenuCreateDto, @User() user: any) {
    return await this.menuService.save(body, user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '메뉴 삭제' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '메뉴 삭제 성공',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: '잘못된 요청',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: '서버 에러',
  })
  async deleteMenu(@Param('id', ParseIntPipe) id: number, @User() user: any) {
    return await this.menuService.delete(id, user);
  }

  @Get('')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '메뉴 목록 조회' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '메뉴 조회 성공',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: '잘못된 요청',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: '서버 에러',
  })
  async getMenus(@Query() query: MenuSearchDto) {
    return await this.menuService.getMenus(query);
  }
}
