import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AlertDTO } from './alert.dto';

@Injectable()
export class AlertService {

  constructor(private readonly prismaService: PrismaService) {

  }


  async getAllAlerts() {
    return await this.prismaService.alert.findMany({
      include: { sensor: true },
      orderBy: { id: 'desc' }
    });
  }
  async getAlerts() {
    return await this.prismaService.alert.findMany({
      where: {
        isEnabled: true,
        action: 'light'
      }
    });
  }

  async createAlert(alert: AlertDTO) {
    try {
      await this.prismaService.alert.create({
        data: {
          sensorId: alert.sensorId,
          name: alert.name,
          condition: alert.condition,
          action: alert.action,
          threshold: alert.threshold,
          isEnabled: alert.isEnabled,
        }
      });

      return { message: 'Alerta Creada.', success: true }
    } catch (err) {
      return { message: 'Error.', success: false }
    }
  }

  async updateAlert(id: number, alert: AlertDTO) {
    try {
      await this.prismaService.alert.update({
        data: {
          sensorId: alert.sensorId,
          name: alert.name,
          condition: alert.condition,
          threshold: alert.threshold,
          isEnabled: alert.isEnabled,
        },
        where: { id }
      });

      return { message: 'Alerta Actualizada.', success: true }
    } catch (err) {
      return { message: 'Error.', success: false }
    }
  }

  async deleteAlerts(id: number) {
    try {
      await this.prismaService.alert.delete({
        where: { id }
      });

      return { message: 'Alerta eliminada.', success: true }
    } catch (err) {
      return { message: 'Error.', success: false }
    }
  }
}
