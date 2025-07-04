import { Module } from '@nestjs/common';
import { MainLoadService } from './main-load.service';
import { MainLoadController } from './main-load.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [MainLoadService, PrismaService],
  controllers: [MainLoadController]
})
export class MainLoadModule {}
