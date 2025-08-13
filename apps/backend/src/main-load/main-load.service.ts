import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MainLoadService {

    constructor(private readonly prismaService: PrismaService) {

    }

    async mainLoad() {
        const sensors = await this.prismaService.sensor.createMany({
            data: [
                {
                    name: "Sensor de Proximidad HC-SR04",
                    type: "proximidad",
                    pin: "GPIO2",
                    isActive: true,
                },
                {
                    name: "Sensor de Temperatura y Humedad DHT11",
                    type: "temperatura",
                    pin: "GPIO4",
                    isActive: true,
                },
                {
                    name: "Sensor de Gas Flying Fish",
                    type: "gas",
                    pin: "GPIO5",
                    isActive: true,
                },
            ],
        });

        const sensorList = await this.prismaService.sensor.findMany();

        function generarLecturas(sensor) {
            const readings = [];
            for (let i = 0; i < 20; i++) {
                let value, unit;

                switch (sensor.type) {
                    case "proximidad":
                        value = Math.floor(Math.random() * 200); // cm
                        unit = "cm";
                        break;
                    case "temperatura":
                        value = (Math.random() * 10 + 20).toFixed(2); // 20-30°C
                        unit = "°C";
                        break;
                    case "gas":
                        value = Math.floor(Math.random() * 500); // ppm
                        unit = "ppm";
                        break;
                }

                readings.push({
                    sensorId: sensor.id,
                    value: parseFloat(value),
                    unit,
                    createdAt: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24), // días pasados aleatorios
                });
            }
            return readings;
        }

        for (const sensor of sensorList) {
            const data = generarLecturas(sensor);
            await this.prismaService.reading.createMany({ data });
        }

        await this.prismaService.alert.createMany({
            data: [
                {
                    name: "Temperatura alta",
                    condition: ">",
                    threshold: 28,
                    // unit: "°C",
                    sensorId: sensorList.find((s) => s.type === "temperatura").id,
                },
                {
                    name: "Gas peligroso",
                    condition: ">",
                    threshold: 300,
                    // unit: "ppm",
                    sensorId: sensorList.find((s) => s.type === "gas").id,
                },
                {
                    name: "Objeto muy cercano",
                    condition: "<",
                    threshold: 10,
                    // unit: "cm",
                    sensorId: sensorList.find((s) => s.type === "proximidad").id,
                },
            ]
        });
        const alertsList = await this.prismaService.alert.findMany();

        const triggers = [];
        for (const alert of alertsList) {
            for (let i = 0; i < 5; i++) {
                triggers.push({
                    alertId: alert.id,
                    triggeredAt: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 48),
                });
            }
        }
        await this.prismaService.alertTrigger.createMany({ data: triggers });

        return { message: 'Data cargada exitosamente' }
    }
}
