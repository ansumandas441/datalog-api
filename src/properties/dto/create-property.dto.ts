import { IsEnum, IsObject, IsString, Matches, MinLength } from "@nestjs/class-validator";

export enum FieldType {
    STRING = 'string',
    NUMBER = 'number',
    BOOLEAN = 'boolean',
}

export class CreatePropertyDto {
    @IsString()
    @MinLength(1, { message: 'Name must be at least 1 character long' })
    @Matches(/^[A-Za-z][A-Za-z0-9_ ]*$/, {
        message: 'Name must start with a letter and contain only letters and spaces',
    })
    name: string;
    
    @IsEnum(FieldType, {
        message: 'Type must be one of: string, number, boolean',
    })
    type: string;
    
    @IsString()
    description: string;

    @IsObject()
    valdiationRules: Record<string, any>;
}
