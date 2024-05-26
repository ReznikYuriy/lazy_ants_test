import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './services/users.service';
import CreateUserDto from './dto/create.user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('product')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
