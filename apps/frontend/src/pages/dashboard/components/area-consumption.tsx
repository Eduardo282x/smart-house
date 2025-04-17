import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
    { name: "Entrada", energy: 25 },
    { name: "Salon 1", energy: 45 },
    { name: "Salon 2", energy: 65 },
    { name: "Comedor", energy: 35 },
]

export const AreaConsumptionChart = () => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="energy" fill="#22c55e" />
            </BarChart>
        </ResponsiveContainer>
    )
}

