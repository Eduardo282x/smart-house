import { Module } from '@nestjs/common';
import { AreaDeviceController } from './area-device.controller';
import { AreaDeviceService } from './area-device.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [AreaDeviceController],
  providers: [AreaDeviceService, PrismaService]
})
export class AreaDeviceModule {}
