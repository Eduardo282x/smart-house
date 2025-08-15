import { Controller, Get, Post, Body, Res, ParseIntPipe, } from '@nestjs/common';
import { ReadingService } from './reading.service';
import { ReadingDTO } from './reading.dto';
import { Response } from 'express';
import { Param } from '@nestjs/common';

@Controller('reading')
export class ReadingController {
  constructor(private readonly readingService: ReadingService) { }

  @Get()
  async getReadings() {
    return await this.readingService.getReading();
  }
  @Get('/since/:id')
  async getSensorData(@Param('id') id: string) {
    return await this.readingService.getReadingsSince(id);
  }
  @Get('/last')
  async getLastReading() {
    return await this.readingService.getLastReading();
  }
  @Get('/last/new')
  async getLastReadingNew() {
    return await this.readingService.getLastReadingNew();
  }
  @Get('/lasted')
  async getLastedReading() {
    return await this.readingService.getLastedReading();
  }

  @Post()
  async saveReading(@Body() reading: ReadingDTO) {
    console.log(reading);
    return await this.readingService.saveReading(reading);
  }

  @Get('/export')
  async exportReadings(@Res() res: Response) {
    return await this.readingService.exportReadingsToExcel(res);
  }
}
