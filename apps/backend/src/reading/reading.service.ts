import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReadingDTO } from './reading.dto';

@Injectable()
export class ReadingService {

  constructor(private readonly prismaService: PrismaService) {

  }

  async getReading() {
    return this.prismaService.reading.findMany();
  }

  async saveReading(reading: ReadingDTO) {
    try {

      await this.prismaService.reading.create({
        data: {
          sensorId: reading.sensorId,
          value: reading.value,
          unit: reading.unit,
        }
      });

      return { message: 'Lectura guardado', success: true };
    } catch(err){
      return { message: `Error: ${err}`, success: true };
    }
  }
}
