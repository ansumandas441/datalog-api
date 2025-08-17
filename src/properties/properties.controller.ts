import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { getOrgIdentity, UserIdentity } from 'src/_common/decorators/get-user-identity';
import { Response } from 'src/_common/response/response';
import { CreatePropertyDto } from './dto/create-property.dto';
import { FindPropertiesByAttributesDto } from './dto/find-properties-by-attribute';
import { PropertyPaginationDto } from './dto/pagination-dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PropertiesService } from './properties.service';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  async create(
    @getOrgIdentity() identity: UserIdentity,
    @Body() createPropertyDto: CreatePropertyDto) {
    const result = await this.propertiesService.create(identity.getOrgId(), createPropertyDto);
    console.log({result})
    if(!result){
      throw new HttpException("Failed to create property", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return Response.Success(result);
  }

  @Get()
  async findAll(
    @getOrgIdentity() identity: UserIdentity,
    @Body() propertyPaginationDto: PropertyPaginationDto) {
    return this.propertiesService.findAll(identity.getOrgId(), propertyPaginationDto);
  }

  @Get(':id')
  async findById(
    @getOrgIdentity() identity: UserIdentity,
    @Param('id') id: string) {
    return this.propertiesService.findById(identity.getOrgId(), id);
  }

  @Get('by-attributes')
  async findOne(
    @getOrgIdentity() identity: UserIdentity,
    @Query() query: FindPropertiesByAttributesDto){
    return this.propertiesService.findByNameAndType(identity.getOrgId(), query.name, query.type);
  }

  @Patch(':id')
  async update(
    @getOrgIdentity() identity: UserIdentity,
    @Param('id') id: string, @Body() updatePropertyDto: UpdatePropertyDto) {
    return this.propertiesService.update(identity.getOrgId(), id, updatePropertyDto);
  }

  @Delete(':id')
  async remove(
    @getOrgIdentity() identity: UserIdentity,
    @Param('id') id: string) {
    return this.propertiesService.remove(identity.getOrgId(), id);
  }
}
