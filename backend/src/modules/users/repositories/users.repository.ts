import { Injectable } from '@nestjs/common';
import { RolesEnum } from '../enums/user.role';
import { User as UserModel } from '@prisma/client';
import CreateUserDto from '../dto/create.user.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export default class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number): Promise<UserModel> {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async create(data: CreateUserDto): Promise<UserModel> {
    const user = await this.prisma.user.create({ data });
    return user;
  }

  async findAllAdmins(): Promise<UserModel[]> {
    return this.prisma.user.findMany({
      where: { role: RolesEnum.ADMIN },
    });
  }

  async findOneByEmail(email: string): Promise<UserModel> {
    return this.prisma.user.findFirst({
      where: { email },
    });
  }
}
