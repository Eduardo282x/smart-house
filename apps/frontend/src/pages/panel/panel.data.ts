export type SensorType = "Temperatura" | "Gas" | "humidity" | "air" | "light" | "Proximidad"

export interface Sensor {
    id: string
    name: string
    type: SensorType
    isActive: boolean
    value: string
    unit: string
    lastUpdated: string
}
