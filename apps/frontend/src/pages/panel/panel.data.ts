export type SensorType = "temperature" | "motion" | "humidity" | "air" | "light" | "proximity"

export interface Sensor {
    id: string
    name: string
    type: SensorType
    isActive: boolean
    value: string
    unit: string
    lastUpdated: string
}

export const sensorData: Sensor[] = [
    {
        id: "1",
        name: "Sensor Cocina",
        type: "temperature",
        isActive: true,
        value: "24.5",
        unit: "°C",
        lastUpdated: "2 min ago",
    },
    {
        id: "2",
        name: "Detector Entrada",
        type: "motion",
        isActive: true,
        value: "Sin movimiento",
        unit: "",
        lastUpdated: "1 min ago",
    },
    {
        id: "3",
        name: "Humedad Baño",
        type: "humidity",
        isActive: true,
        value: "65",
        unit: "%",
        lastUpdated: "5 min ago",
    },
    {
        id: "4",
        name: "Calidad Aire",
        type: "air",
        isActive: false,
        value: "450",
        unit: "ppm",
        lastUpdated: "10 min ago",
    },
    {
        id: "5",
        name: "Luz Salón",
        type: "light",
        isActive: true,
        value: "320",
        unit: "lux",
        lastUpdated: "3 min ago",
    },
    {
        id: "6",
        name: "Proximidad Garaje",
        type: "proximity",
        isActive: true,
        value: "1.5",
        unit: "m",
        lastUpdated: "30 sec ago",
    },
]