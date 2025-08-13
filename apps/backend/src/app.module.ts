import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MainLoadModule } from './main-load/main-load.module';
import { PrismaService } from './prisma/prisma.service';
import { SensorModule } from './sensor/sensor.module';
import { ReadingModule } from './reading/reading.module';
import { AlertModule } from './alert/alert.module';

@Module({
  imports: [MainLoadModule, SensorModule, ReadingModule, AlertModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
