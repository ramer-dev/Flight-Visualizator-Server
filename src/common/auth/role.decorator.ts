import { SetMetadata } from '@nestjs/common';

export const Roles = (role: number): any => SetMetadata('auth', role)