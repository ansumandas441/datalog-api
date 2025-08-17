import { Injectable } from "@nestjs/common";
import { DataType, Property } from "generated/prisma";
import { PrismaService } from "src/_common/prisma-service/prisma.service";
import { ResultPagination } from "src/_common/response/result-pagination";
import { CreatePropertyDto } from "./dto/create-property.dto";
import { PropertyPaginationDto } from "./dto/pagination-dto";
import { UpdatePropertyDto } from "./dto/update-property.dto";

@Injectable()
export class PropertiesRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async create(organizationId: string, createPropertyDto: CreatePropertyDto){
        const { name, type, description, valdiationRules } = createPropertyDto;
        
        try {
            const property = await this.prismaService.withOrgContext(organizationId).property.create({
                data: {
                    name,
                    type,
                    description,
                    organizationId,
                    valdiationRules,
                },
                select: {
                    id: true,
                    name: true,
                    type: true,
                    valdiationRules: true,
                    createdAt: true,
                    updatedAt: true,
                }
            });

            return property;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    //I am using simple pagination, as hash based pagination is not required for this simple case
    async findAll(
        organizationId: string, 
        paginationDto: PropertyPaginationDto,
    ) : Promise<ResultPagination<Property> | null> {
        try {
            const page = paginationDto.page ?? 1;
            const limit = paginationDto.limit ?? 10;
            const skip = (page - 1) * limit;
            const sortOrder = paginationDto.sortOrder || 'desc';
        
            const prismaWithContext = this.prismaService.withOrgContext(organizationId);
            const where = {
                organizationId: organizationId
            }
            
            const [result, total] = await Promise.all([
                prismaWithContext.property.findMany({
                    where,
                    orderBy: {
                        createdAt: sortOrder
                    },
                    skip,
                    take: limit,
                }),
                prismaWithContext.property.count({ where })
            ]);
        
            return new ResultPagination(result, page, limit, total);
        } catch (error) {
            console.log(error);
            return null;
        }

    }

    async findById(organizationId: string, id: string) : Promise<Property | null>{
        try {
            const result = await this.prismaService.withOrgContext(organizationId).property.findUnique({
                where: {
                    id: id
                }
            });

            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async findByNameAndType(organizationId: string, name: string, type: DataType): Promise<Property | null>{
        try {
            const result = await this.prismaService.withOrgContext(organizationId).property.findUnique({
                where: {
                    organizationId_name_type: {
                        organizationId: organizationId,
                        name: name,
                        type: type,
                    }
                }
            });

            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async update(organizationId: string, propertyId: string, updatePropertyDto: UpdatePropertyDto){
        try {
            const { name, type, description, valdiationRules } = updatePropertyDto;
            const task = await this.prismaService.withOrgContext(organizationId).property.update({
                where: {
                    id: propertyId
                  },
                data: {
                    name,
                    type,
                    description,
                    valdiationRules,
                },
            });

            return task;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async remove(organizationId: string, propertyId: string){
        try {
            const deleted = await this.prismaService.withOrgContext(organizationId).property.deleteMany({
                where: {
                  id: propertyId,
                },
              });
          
              return deleted;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

}