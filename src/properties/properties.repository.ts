import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CreatePropertyDto } from "./dto/create-property.dto";
import { UpdatePropertyDto } from "./dto/update-property.dto";

@Injectable()
export class PropertiesRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async create(organizationId: string, createPropertyDto: CreatePropertyDto){
        const { name, type, description, valdiationRules } = createPropertyDto;
        
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
    }

    async findAll(){


    }

    async findOne(){


    }

    async update(organizationId: string, updatePropertyDto: UpdatePropertyDto){
        try {
            const { name, type, description, propertyId } = updatePropertyDto;
            const task = await this.prismaService.withOrgContext(organizationId).property.update({
                where: {
                    id: propertyId
                  },
                data: {
                    name,
                    type,
                    description,
                },
            });

            return task;
        } catch (error) {
                
        }
    }

    async remove(){


    }

}