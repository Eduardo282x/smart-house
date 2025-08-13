import { Injectable } from '@nestjs/common';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlertService {

  constructor(private readonly prismaService: PrismaService) {
    
  }
  create(createAlertDto: CreateAlertDto) {
    return 'This action adds a new alert';
  }

  async getAlerts() {
    return await this.prismaService.alert.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} alert`;
  }

  update(id: number, updateAlertDto: UpdateAlertDto) {
    return `This action updates a #${id} alert`;
  }

  remove(id: number) {
    return `This action removes a #${id} alert`;
  }
}
