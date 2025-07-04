import { Injectable } from '@nestjs/common';
import { AccessType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AccessLogService {
    constructor(private prisma: PrismaService) { }

    logAccess(userId: string, areaId: string, type: AccessType) {
        return this.prisma.accessLog.create({
            data: {
                userId,
                areaId,
                type,
                timestamp: new Date(),
            },
        });
    }

    findByArea(areaId: string) {
        return this.prisma.accessLog.findMany({
            where: { areaId },
            include: { user: true },
            orderBy: { timestamp: 'desc' },
        });
    }
}
