import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { AlertService } from './alert.service';
import { AlertDTO } from './alert.dto';

@Controller('alert')
export class AlertController {
  constructor(private readonly alertService: AlertService) { }


  @Get('/all')
  async getAllAlerts() {
    return await this.alertService.getAllAlerts();
  }

  @Get()
  async getAlerts() {
    return await this.alertService.getAlerts();
  }

  @Post()
  async create(@Body() createAlertDto: AlertDTO) {
    return await this.alertService.createAlert(createAlertDto);
  }

  @Put('/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateAlertDto: AlertDTO) {
    return await this.alertService.updateAlert(id, updateAlertDto);
  }

  @Delete('/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.alertService.deleteAlerts(id);
  }
}
