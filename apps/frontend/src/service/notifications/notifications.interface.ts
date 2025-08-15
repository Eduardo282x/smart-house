import { SensorType } from "@/pages/panel/panel.data";

export interface Reading {
    id: number;
    sensorId: number;
    value: number;
    unit: string;
    createdAt: string;
    sensor: {
        id: number;
        name: string;
        type: SensorType;
        pin: string;
        isActive: boolean;
        createdAt: string;
        updatedAt: string;
    }
}