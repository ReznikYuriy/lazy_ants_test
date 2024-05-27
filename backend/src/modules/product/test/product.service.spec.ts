import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../services/product.service';
import { CreateProductDto } from '../dto/create.product.dto';
import { UpdateProductDto } from '../dto/update.product.dto';
import ProductRepository from '../repositories/product.repository';
import { ConflictException } from '@nestjs/common';
import { Product } from '@prisma/client';

describe('ProductService', () => {
  let productService: ProductService;
  let productRepository: ProductRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: ProductRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            findOneByName: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    productService = module.get<ProductService>(ProductService);
    productRepository = module.get<ProductRepository>(ProductRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(productService).toBeDefined();
  });

  describe('create', () => {
    it('should create a product', async () => {
      const dto: CreateProductDto = {
        name: 'Test Product',
        price: 10,
        description: 'desc',
        category: 'cat',
      };
      const product: Product = {
        id: 1,
        ...dto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(productRepository, 'findOneByName').mockResolvedValue(null);
      jest.spyOn(productRepository, 'create').mockResolvedValue(product);

      const result = await productService.create(dto);

      expect(productRepository.findOneByName).toHaveBeenCalledWith(dto.name);
      expect(productRepository.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(product);
    });

    it('should throw a ConflictException if product with such name already exists', async () => {
      const dto: CreateProductDto = {
        name: 'Test Product',
        price: 10,
        description: 'desc',
        category: 'cat',
      };
      const product: Product = {
        id: 1,
        ...dto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(productRepository, 'findOneByName').mockResolvedValue(product);

      await expect(productService.create(dto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const products: Product[] = [
        {
          id: 1,
          name: 'Product 1',
          description: '',
          price: 10,
          category: '',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: 'Product 2',
          description: '',
          price: 20,
          category: '',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      jest.spyOn(productRepository, 'findAll').mockResolvedValue(products);

      const result = await productService.findAll();
      expect(result).toEqual(products);
    });
  });

  describe('findOne', () => {
    it('should return a single product', async () => {
      const product: Product = {
        id: 1,
        name: 'Product 1',
        description: '',
        price: 10,
        category: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(productRepository, 'findById').mockResolvedValue(product);

      const result = await productService.findOne(1);
      expect(result).toEqual(product);
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const updateDto: UpdateProductDto = {
        name: 'Updated Product',
        price: 20,
      };
      const updatedProduct: Product = {
        id: 1,
        name: updateDto?.name || 'Updated Product',
        price: updateDto?.price || 11,
        description: '',
        category: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(productRepository, 'findOneByName').mockResolvedValue(null);
      jest.spyOn(productRepository, 'update').mockResolvedValue(updatedProduct);

      const result = await productService.update(1, updateDto);
      expect(result).toEqual(updatedProduct);
    });

    it('should throw a ConflictException if product with such name already exists', async () => {
      const updateDto: UpdateProductDto = {
        name: 'Updated Product',
        price: 20,
      };
      const existingProduct: Product = {
        id: 2,
        name: updateDto?.name || 'Updated Product',
        price: updateDto?.price || 20,
        description: '',
        category: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(productRepository, 'findOneByName')
        .mockResolvedValue(existingProduct);

      await expect(productService.update(1, updateDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a product', async () => {
      const product: Product = {
        id: 1,
        name: 'Product 1',
        description: '',
        price: 10,
        category: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(productRepository, 'findById').mockResolvedValue(product);
      jest.spyOn(productRepository, 'delete').mockResolvedValue(product);

      const result = await productService.remove(1);
      expect(result).toEqual(product);
    });

    it('should throw a ConflictException if product with such ID does not exist', async () => {
      jest.spyOn(productRepository, 'findById').mockResolvedValue(null);

      await expect(productService.remove(1)).rejects.toThrow(ConflictException);
    });
  });
});
