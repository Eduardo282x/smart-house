import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export enum DeviceType {
    LIGHT = 'LIGHT',
    AC = 'AC',
}

export class CreateDeviceDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEnum(DeviceType)
    type: DeviceType;

    @IsNumber()
    powerWatts: number;
}
