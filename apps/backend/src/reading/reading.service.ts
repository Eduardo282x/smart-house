import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReadingDTO } from './reading.dto';
import * as ExcelJS from "exceljs";
import { Response } from 'express';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';

@Injectable()
export class ReadingService {

  constructor(
    private readonly prismaService: PrismaService,
    private readonly websocketGateway: WebsocketGateway

  ) {

  }

  async getLastReadingNew() {
    const lastDates = await this.prismaService.reading.groupBy({
      by: ['sensorId'],
      _max: {
        createdAt: true
      }
    });

    const lastReadings = await Promise.all(
      lastDates.map(async ({ sensorId, _max }) => {
        const reading = await this.prismaService.reading.findFirst({
          where: {
            sensorId,
            createdAt: _max.createdAt
          },
          include: {
            sensor: true,
            AlertTrigger: {
              include: {
                alert: true
              }
            }
          }
        });

        // Verificamos si hay una alerta en el mismo minuto que la lectura
        let active = false;
        if (reading && reading.AlertTrigger.length > 0) {
          const readingDate = new Date(reading.createdAt);
          active = reading.AlertTrigger.some(trigger => {
            const triggerDate = new Date(trigger.triggeredAt);
            return (
              triggerDate.getFullYear() === readingDate.getFullYear() &&
              triggerDate.getMonth() === readingDate.getMonth() &&
              triggerDate.getDate() === readingDate.getDate() &&
              triggerDate.getHours() === readingDate.getHours() &&
              triggerDate.getMinutes() === readingDate.getMinutes()
            );
          });
        }

        return {
          ...reading,
          active
        };
      })
    );

    return lastReadings;
  }


  async getLastReading() {
    const lastDates = await this.prismaService.reading.groupBy({
      by: ['sensorId'],
      _max: {
        createdAt: true
      }
    });

    const lastReadings = await Promise.all(
      lastDates.map(async ({ sensorId, _max }) => {
        const reading = await this.prismaService.reading.findFirst({
          where: {
            sensorId,
            createdAt: _max.createdAt
          },
          include: {
            sensor: true,
            AlertTrigger: {
              include: {
                alert: true
              }
            }
          }
        });

        return {
          ...reading,
          active: reading?.AlertTrigger?.length > 0
        };
      })
    );

    return lastReadings;
  };

  async getLastedReading() {
    return this.prismaService.reading.findFirst({
      include: { sensor: true },
      orderBy: { id: 'desc' }
    });
  }
  async getReading() {
    return this.prismaService.reading.findMany({
      include: { sensor: true }
    });
  }

  async getReadingsSince(range: string) {
    const start = this.parseTimeRangeToDate(range);

    const rows = await this.prismaService.reading.findMany({
      where: { createdAt: { gte: start } },
      include: { sensor: true },
      orderBy: { createdAt: 'desc' },
    });

    // Opcional: agrega secondsAgo calculado en backend
    const now = Date.now();
    return rows.map(r => ({
      ...r,
      secondsAgo: Math.floor((now - new Date(r.createdAt).getTime()) / 1000),
    }));
  }

  parseTimeRangeToDate(range: string): Date {
    // admite: "5min", "30min", "1h", "2h", "6h"
    const m = range.trim().toLowerCase().match(/^(\d+)\s*(min|m|h)$/);
    if (!m) throw new Error('Rango no soportado. Usa ej: "5min", "30min", "1h", "2h"');

    const value = parseInt(m[1], 10);
    const unit = m[2];

    const now = Date.now();
    let ms = 0;
    if (unit === 'h') ms = value * 60 * 60 * 1000;
    else ms = value * 60 * 1000; // min/m

    return new Date(now - ms);
  }

  async saveReading(reading: ReadingDTO) {
    try {
      const setUnit = reading.unit === 'C' ? '°C' : reading.unit;

      const newReading = await this.prismaService.reading.create({
        data: {
          sensorId: reading.sensorId,
          value: reading.value,
          unit: setUnit,
        },
      });

      // 2️⃣ Obtener todas las alertas de este sensor
      const alerts = await this.prismaService.alert.findMany({
        where: { sensorId: reading.sensorId, isEnabled: true },
      });

      // 3️⃣ Verificar cada alerta
      for (const alert of alerts) {
        let conditionMet = false;

        switch (alert.condition) {
          case "greater":
            conditionMet = reading.value > alert.threshold;
            break;
          case "less":
            conditionMet = reading.value < alert.threshold;
            break;
          case "equal":
            conditionMet = reading.value === alert.threshold;
            break;
        }

        // 4️⃣ Si cumple condición, registrar AlertTrigger
        if (conditionMet) {
          const saveAlertTrigger = await this.prismaService.alertTrigger.create({
            data: {
              alertId: alert.id,
              readingId: newReading.id,
            },
          });

          if (alert.action == 'notify') {
            await this.prismaService.notification.create({
              data: {
                alertTriggerId: saveAlertTrigger.id,
                read: false
              }
            })
          }
        }
      }

      this.websocketGateway.server.emit('updateReading', 'Actualiza')

      return { message: 'Lectura guardado', success: true };
    } catch (err) {
      return { message: `Error: ${err}`, success: true };
    }
  }

  async exportReadingsToExcel(res: Response) {
    // 1️⃣ Obtener lecturas y alertas relacionadas
    const readings = await this.prismaService.reading.findMany({
      include: {
        sensor: true,
        AlertTrigger: {
          include: {
            alert: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // 2️⃣ Crear el libro y hoja de Excel
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Historial de Sensores");

    // 3️⃣ Agregar encabezados
    sheet.columns = [
      { header: "ID Lectura", key: "id", width: 12 },
      { header: "Sensor", key: "sensor", width: 25 },
      { header: "Tipo", key: "type", width: 15 },
      { header: "Valor", key: "valueUnit", width: 12 },
      { header: "Unidad", key: "unit", width: 10 },
      { header: "Fecha", key: "fecha", width: 20 },
      { header: "Alertas", key: "alerts", width: 30 },
    ];

    // 4️⃣ Agregar filas con formato si hay alerta
    readings.forEach((reading) => {
      const hasAlert = reading.AlertTrigger.length > 0;
      const alertNames = reading.AlertTrigger.map((t) => t.alert.name).join(", ");
      const setUnit = reading.unit === 'C' ? '°C' : reading.unit;
      const row = sheet.addRow({
        id: reading.id,
        sensor: reading.sensor.name,
        type: reading.sensor.type,
        valueUnit: reading.value,
        unit: setUnit || "",
        fecha: formatDateShort(reading.createdAt),
        alerts: alertNames || "N/A",
      });

      // Colorear si tiene alerta
      if (hasAlert) {
        row.eachCell((cell) => {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFFF9999" }, // Rojo claro
          };
        });
      }
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=clientes.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  }

}

export const formatDateShort = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear().toString().slice(-2);
  return `${day}/${month}/${year}`;
};

export const formatOnlyNumberWithDots = (number: number | string, digits?: number): string => {
  const parsed = typeof number === 'string' ? parseFloat(number) : number;

  return new Intl.NumberFormat('es-VE', {
    minimumFractionDigits: digits ? digits : 2,
    maximumFractionDigits: digits ? digits : 2,
  }).format(parsed);
};
