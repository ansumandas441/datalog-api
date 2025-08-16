import { Type } from "@nestjs/class-transformer";
import { IsArray, IsString, Matches, MaxLength, MinLength, ValidateNested } from "@nestjs/class-validator";
import { CreateEventDto } from "src/events/dto/create-event.dto";
import { CreatePropertyDto } from "src/properties/dto/create-property.dto";

export class TrackingPlanEventDto extends CreateEventDto {
    @IsArray()
    @ValidateNested({each: true})
    @Type(()=>CreatePropertyDto)
    properties: CreatePropertyDto
}

export class CreateTrackingPlanDto {
    @IsString()
    @MinLength(3, { message: 'Name must be at least 1 character long' })
    @MaxLength(65, { message: 'Name must have less than 65 character' })
    @Matches(/^[A-Za-z][A-Za-z0-9_ ]*$/, {
        message: 'Name must start with a letter and contain only letters and spaces',
    })
    name: string;

    @IsString()
    description: string;

    @IsArray()
    @ValidateNested({each: true})
    @Type(()=>TrackingPlanEventDto)
    events: TrackingPlanEventDto
}
