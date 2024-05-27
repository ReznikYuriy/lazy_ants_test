import { ConflictException, Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create.product.dto';
import { UpdateProductDto } from '../dto/update.product.dto';
import ProductRepository from '../repositories/product.repository';
import { Product } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}
  async create(dto: CreateProductDto): Promise<Product> {
    const productWithSuchName = await this.productRepository.findOneByName(
      dto.name,
    );
    if (productWithSuchName) {
      throw new ConflictException('Product with such name already exist');
    }
    return this.productRepository.create(dto);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  async findOne(id: number): Promise<Product> {
    return this.productRepository.findById(id);
  }

  async update(id: number, dto: UpdateProductDto) {
    if (dto?.name) {
      const productWithSuchName = await this.productRepository.findOneByName(
        dto.name,
      );
      if (productWithSuchName) {
        throw new ConflictException('Product with such name already exist');
      }
    }

    return this.productRepository.update(id, dto);
  }

  async remove(id: number): Promise<Product> {
    const productWithSuchId = await this.findOne(id);
    if (!productWithSuchId) {
      throw new ConflictException('Product with such Id does not exist');
    }
    return this.productRepository.delete(id);
  }
}
