import { IsNumber, IsString } from "class-validator";

export class ReadingDTO {
    @IsNumber()
    sensorId: number;
    @IsNumber()
    value: number;
    @IsString()
    unit: string;
}