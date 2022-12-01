// import { Injectable } from '@nestjs/common';
// import { googleParsedAddressToModel } from '../../../apps/shared/utils/address-util';
// import { IAddressModel } from '../../../apps/shared/models';
// import { HttpService } from '@nestjs/axios';
// import { lastValueFrom } from 'rxjs';
// import { LoggerService } from '../logger/logger.service';
//
// @Injectable()
// export class LocationService {
//   apiKey = 'AIzaSyClVO_D6Z7axEDqnuBxAOgDLyRdbEMTSpg';
//
//   constructor(
//     private readonly httpService: HttpService,
//     private readonly logger: LoggerService,
//   ) {}
//
//   async buildLngLatByAddressModel(
//     address: IAddressModel,
//     apiType: 'fullAddress' | 'countryOnly' = 'fullAddress',
//   ): Promise<IAddressModel> {
//     let addressInfo = '';
//     if (address.street) {
//       addressInfo += address.street;
//     }
//     if (address.city) {
//       addressInfo += ' ' + address.city;
//     }
//     if (address.country) {
//       addressInfo += ' ' + address.country;
//     }
//     if (!address.country && address.countryCode) {
//       addressInfo += ' ' + address.countryCode;
//     }
//     if (address.state) {
//       addressInfo += ' ' + address.state;
//     }
//     if (addressInfo.trim()) {
//       const res = await this.buildLngLatByAddress(addressInfo, apiType);
//       if (res) {
//         res.addressType = address.addressType;
//         return res;
//       }
//     }
//     return undefined;
//   }
//
//   async buildLngLatByAddress(
//     address: string,
//     apiType: 'fullAddress' | 'countryOnly' = 'fullAddress',
//   ): Promise<IAddressModel> {
//     ///
//
//     try {
//       const queryType =
//         apiType == 'countryOnly' ? 'components=country:' : 'address=';
//       const encoded = encodeURI(address);
//       const query = `${queryType}${encoded}`;
//       return await this.parseAddress(query);
//     } catch (error) {
//       this.logger.error({ error });
//     }
//     return null;
//   }
//
//   async buildAddressByLngLat(lng: number, lat: number): Promise<IAddressModel> {
//     try {
//       const query = `latlng=${lat},${lng}`;
//       return await this.parseAddress(query);
//     } catch (error) {
//       this.logger.error({ error });
//     }
//     return null;
//   }
//
//   async buildLngLatByAddressInObject(
//     address: string,
//     objectToReturn: {},
//     apiType: 'fullAddress' | 'countryOnly' = 'fullAddress',
//   ): Promise<{ address: IAddressModel; object: any }> {
//     const result = await this.buildLngLatByAddress(address, apiType);
//     return { object: objectToReturn, address: result };
//   }
//
//   private async parseAddress(query: string) {
//     const res = await lastValueFrom(
//       this.httpService.get(
//         `https://maps.googleapis.com/maps/api/geocode/json?key=${this.apiKey}&${query}`,
//       ),
//     );
//     if (res.data && res.data.results && res.data.results.length > 0) {
//       return googleParsedAddressToModel(res.data.results[0]);
//     } else {
//       return null;
//     }
//   }
// }
