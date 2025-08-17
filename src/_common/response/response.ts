import { HttpException, HttpStatus } from '@nestjs/common';


export class Response<T> {
   success: boolean;
   data: T;
   error: string | null;


   constructor(success: boolean, data: T, error: string) {
       this.success = success;
       this.data = data;
       this.error = error;
   }


   public static Success<T>(data: T) {
       return new Response(true, data, null);
   }


   public static Error(error: string, statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR) {
       throw new HttpException(new Response<null>(false, null, error), statusCode);
   }


   public static Empty() {
       return new Response(true, null, null);
   }
}
