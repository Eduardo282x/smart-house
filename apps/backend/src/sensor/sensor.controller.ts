import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { SensorService } from './sensor.service';
import { SensorDTO } from './sensor.dto';

@Controller('sensor')
export class SensorController {

    constructor(private readonly sensorService: SensorService) {

    }

    @Get()
    async getSensors() {
        return await this.sensorService.getSensors();
    }
    @Post()
    async saveSensors(@Body() sensor: SensorDTO) {
        return await this.sensorService.saveSensors(sensor);
    }
    @Put('/:id')
    async updateSensors(@Param('id', ParseIntPipe) id: number,@Body() sensor: SensorDTO) {
        return await this.sensorService.updateSensors(id, sensor);
    }
    @Delete('/:id')
    async deleteSensors(@Param('id', ParseIntPipe) id: number) {
        return await this.sensorService.deleteSensors(id);
    }
}
