import { Injectable } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { PropertyPaginationDto } from './dto/pagination-dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PropertiesRepository } from './properties.repository';

@Injectable()
export class PropertiesService {
  constructor(private readonly repo: PropertiesRepository){ }

  create(organizationId: string, createPropertyDto: CreatePropertyDto) {
    return this.repo.create(organizationId, createPropertyDto)
  }

  findAll(organizationId: string, propertyPaginationDto: PropertyPaginationDto) {
    return this.repo.findAll(organizationId, propertyPaginationDto)
  }

  findById(organizationId: string, id: string) {
    return this.repo.findById(organizationId, id);
  }

  findByNameAndType(organizationId: string, name: string, type) {
    return this.repo.findByNameAndType(organizationId, name, type);
  }

  update(organizationId: string, propertyId: string, updatePropertyDto: UpdatePropertyDto) {
    return this.repo.update(organizationId, propertyId, updatePropertyDto);
  }

  remove(organizationId: string, propertyId: string) {
    return this.repo.remove(organizationId, propertyId);
  }
}
