import { Controller, Get, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) { }


  @Get('/all')
  async getAllNotifications() {
    return await this.notificationService.getAllNotifications();
  }

  @Get('')
  async getNotifications() {
    return await this.notificationService.getNotifications();
  }

  @Put('/all')
  async updateAll() {
    return await this.notificationService.updateAll();
  }

  @Put('/id')
  async update(@Param('id', ParseIntPipe) id: number) {
    return await this.notificationService.update(id);
  }

  @Delete()
  async clear() {
    return await this.notificationService.clear();
  }
}
