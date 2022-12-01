import { Injectable } from '@nestjs/common';
import db from '../../db/db';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class GeoService {
  constructor(private readonly httpService: HttpService) {}
  async buildLngLatByAddress(address: string): Promise<object> {
    const localResult = await this.checkAddressLocally(address);
    if (localResult) {
      return {
        cached: true,
        result: localResult,
      };
    }

    const googleResult = await this.getAddressFromGoogle(address);

    if (!googleResult) {
      return {};
    }
    await this.saveAddressLocally(address, googleResult);
    return {
      cached: false,
      result: googleResult,
    };
  }

  private async getAddressFromGoogle(query: string): Promise<object> {
    const apiKey = 'AIzaSyClVO_D6Z7axEDqnuBxAOgDLyRdbEMTSpg';
    const encoded = encodeURI(query);
    try {
      const result = await lastValueFrom(
        this.httpService.get(
          `https://maps.googleapis.com/maps/api/geocode/json?key=${apiKey}&address=${encoded}`,
        ),
      );
      if (result?.data?.results?.length) {
        return result.data.results[0];
      } else {
        return {};
      }
    } catch (err) {
      console.log('err: ', err);
    }
  }

  async checkAddressLocally(address: string): Promise<any> {
    try {
      return await db.get(address);
    } catch (err) {
      console.log('Address does not exist locally');
    }
  }

  private async saveAddressLocally(address: string, value) {
    try {
      await db.put(address, value);
    } catch (err) {
      console.log('Some Error');
    }
  }
}
