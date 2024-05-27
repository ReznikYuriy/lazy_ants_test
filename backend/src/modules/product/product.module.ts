import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './product.controller';
import { PrismaModule } from '../prisma/prisma.module';
import ProductRepository from './repositories/product.repository';

@Module({
  imports: [PrismaModule],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
})
export class ProductModule {}
