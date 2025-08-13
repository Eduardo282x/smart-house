export interface ISensor {
    id: number;
    name: string;
    type: string;
    pin: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface SensorBody {
    name: string;
    type: string;
    pin: string;
    isActive: boolean;
}