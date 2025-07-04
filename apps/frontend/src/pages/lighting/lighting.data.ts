export 
interface LightFixture {
    id: string
    name: string
    area: string
    type: string
    status: boolean
    consumption: number
}

export const lightData: LightFixture[] = [
    { id: "l1", name: "Entrada Luz 1", area: "Entrada", type: "LED", status: true, consumption: 12 },
    { id: "l2", name: "Entrada Luz 2", area: "Entrada", type: "LED", status: true, consumption: 12 },
    { id: "l3", name: "Salon 1 Luz 1", area: "Salon 1", type: "Fluorescent", status: true, consumption: 18 },
    { id: "l4", name: "Salon 1 Luz 2", area: "Salon 1", type: "Fluorescent", status: false, consumption: 18 },
    { id: "l5", name: "Salon 2 Luz 1", area: "Salon 2", type: "LED", status: true, consumption: 15 },
    { id: "l6", name: "Salon 2 Luz 2", area: "Salon 2", type: "LED", status: true, consumption: 15 },
    { id: "l7", name: "Comedor Luz 1", area: "Comedor", type: "LED", status: true, consumption: 20 },
    { id: "l8", name: "Comedor Luz 2", area: "Comedor", type: "LED", status: false, consumption: 20 },
]