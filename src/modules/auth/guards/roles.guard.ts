import { SetMetadata } from '@nestjs/common';
import { RolesEnum } from '../../users/enums/user.role';

export const Roles = (...roles: RolesEnum[]) => SetMetadata('roles', roles);
