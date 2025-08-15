import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotificationService {

  constructor(private readonly prismaService: PrismaService) {

  }


  async getAllNotifications() {
    return await this.prismaService.notification.findMany({
      include: {
        alertTrigger: {
          include: {
            alert: {
              include: { sensor: true }
            },
            reading: true
          },
        },
      }
    });
  }
  async getNotifications() {
    return await this.prismaService.notification.findMany({
      where: { read: false },
      include: {
        alertTrigger: {
          include: {
            alert: {
              include: { sensor: true }
            }
          }
        }
      }
    });
  }

  async update(id: number) {
    try {
      await this.prismaService.notification.update({
        data: { read: true },
        where: { id }
      });

      return { message: 'Notificación marcada.', success: true }
    } catch (err) {
      return { message: 'Error' }
    }
  }
  async updateAll() {
    try {
      await this.prismaService.notification.updateMany({
        data: { read: true },
      });

      return { message: 'Notificación marcada.', success: true }
    } catch (err) {
      return { message: 'Error' }
    }
  }

  async clear() {
    try {
      await this.prismaService.notification.deleteMany();

      return { message: 'Notificaciones eliminadas.', success: true }
    } catch (err) {
      return { message: 'Error' }
    }
  }
}
