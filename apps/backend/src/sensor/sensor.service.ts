import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SensorDTO } from './sensor.dto';

@Injectable()
export class SensorService {

    constructor(private readonly prismaService: PrismaService) {

    }

    async getSensors() {
        return await this.prismaService.sensor.findMany();
    }
    async saveSensors(sensor: SensorDTO) {
        try {
            this.prismaService.sensor.create({
                data: {
                    name: sensor.name,
                    type: sensor.type,
                    pin: sensor.pin,
                    isActive: sensor.isActive,
                }
            })

            return { success: true, message: 'Sensor guardado' }
        } catch (err) {
            return { success: false, message: err }
        }
    }
    async updateSensors(id: number, sensor: SensorDTO) {
        try {
            this.prismaService.sensor.update({
                data: {
                    name: sensor.name,
                    type: sensor.type,
                    pin: sensor.pin,
                    isActive: sensor.isActive,
                },
                where: { id }
            })

            return { success: true, message: 'Sensor actualizado.' }
        } catch (err) {
            return { success: false, message: err }
        }
    }
    async deleteSensors(id: number) {
        try {
            this.prismaService.sensor.delete({ where: { id } })

            return { success: true, message: 'Sensor eliminado.' }
        } catch (err) {
            return { success: false, message: err }
        }
    }
}
