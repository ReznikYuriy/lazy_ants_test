import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Product as ProductModel, Prisma } from '@prisma/client';

@Injectable()
export default class ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: Prisma.ProductCreateInput): Promise<ProductModel> {
    return this.prisma.product.create({ data: dto });
  }

  async findAll(): Promise<ProductModel[]> {
    return this.prisma.product.findMany({});
  }

  async findById(id: number): Promise<ProductModel> {
    return this.prisma.product.findUnique({ where: { id } });
  }

  async findAllByName(name: string): Promise<ProductModel[]> {
    return this.prisma.product.findMany({
      where: {
        name: {
          contains: name.toLowerCase(),
        },
      },
    });
  }

  async findOneByName(name: string): Promise<ProductModel> {
    return this.prisma.product.findFirst({
      where: {
        name,
      },
    });
  }

  async update(
    id: number,
    data: Prisma.ProductUpdateInput,
  ): Promise<ProductModel> {
    return this.prisma.product.update({
      where: { id },
      data: { ...data },
    });
  }

  async delete(id: number) {
    return this.prisma.product.delete({ where: { id } });
  }
}
