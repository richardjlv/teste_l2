import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PackingController } from './controllers/packing.controller';
import { PackingService } from './services/packing.service';

@Module({
  imports: [],
  controllers: [AppController, PackingController],
  providers: [AppService, PackingService],
})
export class AppModule {}
