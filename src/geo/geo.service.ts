import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  CACHE_MANAGER,
} from '@nestjs/common';
import db from '../../db/db';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { Cache } from 'cache-manager';
export interface IQueryModel {
  address: string;
  apiType: 'fullAddress' | 'countryOnly';
}

@Injectable()
export class GeoService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}
  apiKey = 'AIzaSyClVO_D6Z7axEDqnuBxAOgDLyRdbEMTSpg';

  async buildLngLatByAddress(query: IQueryModel): Promise<object> {
    try {
      const { address, apiType } = query;
      const localResult = await this.checkAddressLocally(address, apiType);
      if (localResult) {
        return {
          cached: true,
          result: localResult,
        };
      }

      const googleResult = await this.getAddressFromGoogle(address, apiType);

      if (!googleResult) {
        return {};
      }
      await this.saveAddressLocally(address, googleResult, apiType);
      return {
        cached: false,
        result: googleResult,
      };
    } catch (err) {
      console.log('Error', err.message | err);
      throw new HttpException(
        `Failed to get address. Error: ${err}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAddressFromGoogle(
    address: string,
    apiType: 'fullAddress' | 'countryOnly' = 'fullAddress',
  ): Promise<object> {
    const encoded = encodeURI(address);
    try {
      const queryType =
        apiType === 'countryOnly' ? 'components=country:' : 'address=';
      const result = await lastValueFrom(
        this.httpService.get(
          `https://maps.googleapis.com/maps/api/geocode/json?key=${this.apiKey}&${queryType}=${encoded}`,
        ),
      );
      if (result?.data?.results?.length) {
        return result.data.results[0];
      } else {
        return {};
      }
    } catch (err) {
      throw new HttpException(
        `Failed to get address from Google service. Error: ${err}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async setDataToRedisCached(
    address: string,
    value: any,
    apiType: 'fullAddress' | 'countryOnly' = 'fullAddress',
  ) {
    await this.cacheService.set(`${apiType}_${address}`, value);
  }
  async getDataFromRedisCached(
    address: string,
    apiType: 'fullAddress' | 'countryOnly' = 'fullAddress',
  ) {
    const cachedData = await this.cacheService.get(`${apiType}_${address}`);
    return cachedData;
  }

  async checkAddressLocally(
    address: string,
    apiType: 'fullAddress' | 'countryOnly' = 'fullAddress',
  ): Promise<any> {
    try {
      const redisCached = await this.getDataFromRedisCached(address, apiType);
      console.log(redisCached);
      return await db.get(`${apiType}_${address}`);
    } catch (err) {
      console.log(`Address ${address} does not exist locally`);
    }
  }

  private async saveAddressLocally(
    address: string,
    value: any,
    apiType: 'fullAddress' | 'countryOnly' = 'fullAddress',
  ) {
    try {
      await this.setDataToRedisCached(address, value, apiType);
      await db.put(`${apiType}_${address}`, value);
    } catch (err) {
      throw new HttpException(
        `Failed to save address locally. Error: ${err}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
