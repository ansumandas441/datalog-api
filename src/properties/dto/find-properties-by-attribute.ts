import { IsOptional, IsString } from "@nestjs/class-validator";

export class FindPropertiesByAttributesDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  type?: string;
}