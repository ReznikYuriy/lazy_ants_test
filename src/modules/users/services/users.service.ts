import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import configs from '../../../configs';
import CreateUserDto from '../dto/create.user.dto';
import UsersRepository from '../repositories/users.repository';
import { hashSync } from 'bcryptjs';
import { RolesEnum } from '../enums/user.role';
import { User } from '@prisma/client';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(private readonly userRepository: UsersRepository) {}
  async onModuleInit() {
    const users = await this.findAllAdmins();
    if (users?.length === 0) {
      await this.createUser({
        name: configs.admin.name,
        email: configs.admin.email,
        password: configs.admin.password,
        role: RolesEnum.ADMIN,
      });
      Logger.log('Default admin created');
    }
  }

  async createUser(dto: CreateUserDto) {
    const data = {
      ...dto,
      password: hashSync(dto.password),
    };
    return this.userRepository.create(data);
  }

  async findAllAdmins() {
    return this.userRepository.findAllAdmins();
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOneByEmail(email);
  }
}
