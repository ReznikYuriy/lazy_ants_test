import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './services/product.service';
import { CreateProductDto } from './dto/create.product.dto';
import { UpdateProductDto } from './dto/update.product.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/guards/roles.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { RolesEnum } from '../users/enums/user.role';
import { OutputProductDto } from './dto/output.product.dto';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productsService: ProductService) {}

  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    type: OutputProductDto,
  })
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(RolesEnum.ADMIN)
  @Post()
  async create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    type: [OutputProductDto],
  })
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(RolesEnum.ADMIN)
  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    type: OutputProductDto,
  })
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(RolesEnum.ADMIN)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.productsService.findOne(+id);
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    type: OutputProductDto,
  })
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(RolesEnum.ADMIN)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateProductDto) {
    return this.productsService.update(+id, dto);
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    type: OutputProductDto,
  })
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(RolesEnum.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
