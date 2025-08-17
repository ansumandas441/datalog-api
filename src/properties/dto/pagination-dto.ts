import { Transform } from "@nestjs/class-transformer";
import { IsIn, IsOptional, IsPositive, Max, Min } from "@nestjs/class-validator";

//Considering that the sort based on crated data for simplicity
export class PropertyPaginationDto {
    @IsPositive()
    @IsOptional()
    page: number;

    @IsPositive()
    @IsOptional()
    @Min(1, { message: "limit must be at least 1" })
    @Max(100, { message: "limit must not exceed 100" })
    limit: number;

    @IsOptional()
    @IsIn(["asc", "desc"], { message: 'sortOrder must be either "asc" or "desc"' })
    @Transform(({ value }) => (value ? value.toLowerCase() : "asc"))
    sortOrder: "asc" | "desc" = "desc";
}