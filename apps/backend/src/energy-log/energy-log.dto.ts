import { IsString, IsNotEmpty } from 'class-validator';

export class TurnOnDeviceDto {
    @IsString()
    @IsNotEmpty()
    deviceId: string;

    @IsString()
    @IsNotEmpty()
    areaId: string;
}


export class TurnOffDeviceDto {
    @IsString()
    @IsNotEmpty()
    deviceId: string;
}
