import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }

    async login(email: string, password: string) {
        const user = await this.prisma.user.findUnique({ where: { email, password } });
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Solo admin y teacher pueden iniciar sesión
        if (user.role === 'STUDENT') {
            throw new UnauthorizedException('Access denied');
        }

        return {
            access_token: user,
            user: {
                id: user.id,
                fullName: user.fullName,
                role: user.role,
            },
        };
    }
}
