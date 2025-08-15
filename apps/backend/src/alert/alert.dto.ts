import { IsBoolean, IsNumber, IsString } from "class-validator";

export class AlertDTO {
    @IsNumber()
    sensorId: number;
    @IsString()
    name: string;
    @IsString()
    condition: string;
    @IsString()
    action: string;
    @IsNumber()
    threshold: number;
    @IsBoolean()
    isEnabled: boolean;
}