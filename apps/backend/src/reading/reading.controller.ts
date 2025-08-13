import { Controller, Get, Post, Body, } from '@nestjs/common';
import { ReadingService } from './reading.service';
import { ReadingDTO } from './reading.dto';

@Controller('reading')
export class ReadingController {
  constructor(private readonly readingService: ReadingService) { }

  @Get()
  async getReadings() {
    return await this.readingService.getReading();
  }

  @Post()
  async saveReading(@Body() reading: ReadingDTO) {
    console.log(reading);
    return await this.readingService.saveReading(reading);
  }
}
