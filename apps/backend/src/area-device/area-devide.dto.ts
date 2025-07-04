import { IsString, IsNotEmpty } from 'class-validator';

export class AssignDeviceDto {
    @IsString()
    @IsNotEmpty()
    areaId: string;

    @IsString()
    @IsNotEmpty()
    deviceId: string;
}
