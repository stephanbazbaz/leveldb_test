import { Controller, Get, Param, Query } from '@nestjs/common';
import { GeoService } from './geo.service';

@Controller('geo')
export class GeoController {
  constructor(private geoService: GeoService) {}

  @Get('/checkAddress/')
  async checkAddressLocally(
    @Query('address') address: string,
  ): Promise<object> {
    return await this.geoService.buildLngLatByAddress(address);
  }
}
