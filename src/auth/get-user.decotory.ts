import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './auth.entity';

export const getUser = createParamDecorator(async function GetData(
  data,
  ctx: ExecutionContext,
): Promise<User> {
  const req = await ctx.switchToHttp().getRequest();
  return req.user;
});
