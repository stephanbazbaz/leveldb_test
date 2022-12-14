import { Test, TestingModule } from '@nestjs/testing';
import { GeoService } from './geo.service';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { countryOnlyResult, fullAddressResult } from './constants';
import db from '../../db/db';
import { v4 as uuidv4 } from 'uuid';

describe('GeoService', () => {
  let service: GeoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot(), CacheModule.register()],
      providers: [GeoService],
    }).compile();

    service = module.get<GeoService>(GeoService);
  });

  it('should search for country only in local db, if not found search it in google and save it to local db', async () => {
    const myuuid = uuidv4();
    const localResult = await service.checkAddressLocally(
      myuuid,
      'countryOnly',
    );
    expect(localResult).toBe(undefined);

    jest
      .spyOn(service, 'getAddressFromGoogle')
      .mockImplementation(async () => countryOnlyResult);

    const checkAddressInGoogle = await service.getAddressFromGoogle(
      'spain',
      'countryOnly',
    );
    expect(checkAddressInGoogle).toBe(countryOnlyResult);
    await db.put(myuuid, checkAddressInGoogle.toString());
    const result = await db.get(myuuid);
    expect(result).not.toBe(undefined);
  });

  it('should search for full address in local db, if not found search it in google and save it to local db', async () => {
    const myuuid = uuidv4();
    const localResult = await service.checkAddressLocally(
      myuuid,
      'fullAddress',
    );
    expect(localResult).toBe(undefined);
    const encoded = encodeURI('Yehuda Hayamit St 21');
    jest
      .spyOn(service, 'getAddressFromGoogle')
      .mockImplementation(async () => fullAddressResult);
    const checkAddressInGoogle = await service.getAddressFromGoogle(
      encoded,
      'fullAddress',
    );
    expect(checkAddressInGoogle).toBe(fullAddressResult);
    await db.put(myuuid, checkAddressInGoogle.toString());
    const result = await db.get(myuuid);
    expect(result).not.toBe(undefined);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
