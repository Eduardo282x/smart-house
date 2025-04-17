export interface AirConditioner {
    id: string
    name: string
    area: string
    status: boolean
    temperature: number
    consumption: number
}

export const temperatureData: AirConditioner[] = [
    { id: "ac1", name: "Main Entrada AC", area: "Entrada", status: true, temperature: 23, consumption: 120 },
    { id: "ac2", name: "Salon 1 AC", area: "Salon 1", status: true, temperature: 22, consumption: 150 },
    { id: "ac3", name: "Salon 2 AC", area: "Salon 2", status: true, temperature: 21, consumption: 180 },
    { id: "ac4", name: "Comedor AC", area: "Comedor", status: false, temperature: 24, consumption: 160 },
]