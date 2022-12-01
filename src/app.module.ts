import { Module } from '@nestjs/common';
import { GeoService } from './geo/geo.service';
import { GeoModule } from './geo/geo.module';

@Module({
  imports: [GeoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
