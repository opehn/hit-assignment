import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from '../common/decorator/role.decorator';
import { User } from '../common/decorator/user.decorator';
import { UserRoles } from '../common/enum/user.enum';
import { ReservationCreateDto } from './dto/create-reservation.dto';
import { ReservationSearchDto } from './dto/search-reservation.dto';
import { ReservationUpdateDto } from './dto/update-reservation.dto';
import { ReservationService } from './reservation.service';

@ApiBearerAuth()
@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post('')
  @Roles([UserRoles.CUSTOMER])
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: '예약 생성' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: '예약 생성 성공',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: '잘못된 요청',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: '서버 에러',
  })
  async createReservation(
    @Body() body: ReservationCreateDto,
    @User() user: any,
  ) {
    return await this.reservationService.create(body, user);
  }

  @Patch(':id')
  @Roles([UserRoles.CUSTOMER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '예약 수정' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '예약 수정 성공',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: '잘못된 요청',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: '서버 에러',
  })
  async updateReservation(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ReservationUpdateDto,
    @User() user: any,
  ) {
    return await this.reservationService.update(id, dto, user);
  }

  @Delete(':id')
  @Roles([UserRoles.CUSTOMER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '예약 삭제' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '예약 삭제 성공',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: '잘못된 요청',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: '서버 에러',
  })
  async deleteReservation(
    @Param('id', ParseIntPipe) id: number,
    @User() user: any,
  ) {
    return await this.reservationService.softDelete(id, user);
  }

  @Get('')
  @Roles([UserRoles.CUSTOMER, UserRoles.OWNER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '예약 목록 조회' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '예약 조회 성공',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: '잘못된 요청',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: '서버 에러',
  })
  async getReservations(@Query() query: ReservationSearchDto) {
    return await this.reservationService.getReservations(query);
  }
}
