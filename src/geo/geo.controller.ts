import { Controller, Get, Query } from '@nestjs/common';
import { GeoService, IQueryModel } from './geo.service';

@Controller('geo')
export class GeoController {
  constructor(private geoService: GeoService) {}

  @Get('/checkAddress/')
  async checkAddressLocally(@Query() query: IQueryModel): Promise<object> {
    return await this.geoService.buildLngLatByAddress(query);
  }
}
