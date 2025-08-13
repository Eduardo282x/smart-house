import { IsBoolean, IsString } from "class-validator";

export class SensorDTO {
    @IsString()
    name: string;
    @IsString()
    type: string;
    @IsString()
    pin: string;
    @IsBoolean()
    isActive: boolean;
}