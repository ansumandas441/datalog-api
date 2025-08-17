import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtGuard implements CanActivate {
   constructor(private jwtService: JwtService) {}


   async canActivate(context: ExecutionContext): Promise<boolean> {
       const request = context.switchToHttp().getRequest();
       const token = this.extractTokenFromHeader(request);
       if (!token) {
           throw new UnauthorizedException();
       }

       try {
           await this.jwtService.verify(token, {
               secret: process.env.JWT_SECRET,
           });
       } catch (err) {
           throw new UnauthorizedException();
       }


       return true;
   }


   private extractTokenFromHeader(request: any): string | null {
       let token: string | null = null;
       try {
           token = request.headers.authorization?.split(' ')[1];
       } catch (err) {
           //
       }


       return token;
   }
}

