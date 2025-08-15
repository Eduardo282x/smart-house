import { Module } from '@nestjs/common';
import { ReadingService } from './reading.service';
import { ReadingController } from './reading.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';

@Module({
  controllers: [ReadingController],
  providers: [ReadingService, PrismaService, WebsocketGateway],
})
export class ReadingModule {}
