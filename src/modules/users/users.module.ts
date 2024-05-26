import { Module } from '@nestjs/common';
import { UserService } from './services/users.service';
import { UserController } from './users.controller';
import UsersRepository from './repositories/users.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  //controllers: [UserController],
  providers: [UserService, UsersRepository],
  exports: [UserService, UsersRepository],
})
export class UsersModule {}
