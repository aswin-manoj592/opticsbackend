import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const BranchId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const branchIdStr = request.headers['branch-id'];
    if (branchIdStr && !isNaN(Number(branchIdStr))) {
        return Number(branchIdStr);
    }
    return null; // Return null if no branchId found, meaning global/admin context
  },
);
