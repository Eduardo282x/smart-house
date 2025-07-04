import { IsEnum, IsString, IsNotEmpty } from 'class-validator';

export enum AccessType {
    ENTRY = 'ENTRY',
    EXIT = 'EXIT',
}
export class LogAccessDto {
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    areaId: string;

    @IsEnum(AccessType)
    type: AccessType;
}
