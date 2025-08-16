import { IsEnum, IsObject, IsString, Matches, MaxLength, MinLength } from "@nestjs/class-validator";

export enum EventType {
    TRACK = 'track',
    IDENTIFY = 'identify',
    ALIAS = 'alias',
    PAGE = 'page',
    SCREEN = 'screen',
}

export class CreateEventDto {
    @IsString()
    @MinLength(3, { message: 'Name must be at least 1 character long' })
    @MaxLength(65, { message: 'Name must have less than 65 character' })
    @Matches(/^[A-Za-z][A-Za-z0-9_ ]*$/, {
        message: 'Name must start with a letter and contain only letters and spaces',
    })
    name: string;
    
    @IsEnum(EventType, {
        message: 'Type must be one of: "track", "identify", "group", "page", "screen"',
    })
    type: string;
    
    @IsString()
    description: string;

    @IsObject()
    valdiationRules: Record<string, any>;
}
