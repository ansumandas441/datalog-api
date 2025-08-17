import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { JwtPayload, verify } from 'jsonwebtoken';


export const getOrgIdentity = createParamDecorator((_, ctx: ExecutionContext) => {
   const req = ctx.switchToHttp().getRequest() as Request;
   const authToken = req.headers['authorization']?.split(' ')[1];
   if (!authToken) {
       throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
   }


   const payload = verify(authToken, process.env.JWT_SECRET) as JwtPayload

   const userIdentity = new UserIdentity();
   userIdentity.sub = payload.sub;
   userIdentity.walletAddress = payload.walletAddress;


   return userIdentity;
}) as () => ParameterDecorator;


export class UserIdentity {
   sub: string;
   walletAddress: string;


   getOrgId(): string {
       return this.sub;
   }
}



