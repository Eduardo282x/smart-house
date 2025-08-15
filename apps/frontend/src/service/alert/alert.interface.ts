export interface AlertBody {
    sensorId: number;
    name: string;
    condition: string;
    action: string;
    threshold: number;
    isEnabled: boolean;
}