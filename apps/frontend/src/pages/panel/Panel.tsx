import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Thermometer, Eye, Droplets, Wind, Lightbulb, AlertTriangle } from "lucide-react"
import { sensorData, SensorType } from "./panel.data"



export const Panel = () => {
    // const [sensors, setSensors] = useState<Sensor[]>()

    const getSensorIcon = (type: SensorType) => {
        switch (type) {
            case "temperature":
                return <Thermometer className="h-5 w-5" />
            case "motion":
                return <Eye className="h-5 w-5" />
            case "humidity":
                return <Droplets className="h-5 w-5" />
            case "air":
                return <Wind className="h-5 w-5" />
            case "light":
                return <Lightbulb className="h-5 w-5" />
            case "proximity":
                return <AlertTriangle className="h-5 w-5" />
        }
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sensorData.map((sensor) => (
                <Card key={sensor.id} className="overflow-hidden border-gray-200 dark:border-gray-700">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-md font-medium">{sensor.name}</CardTitle>
                        <Badge
                            variant={sensor.isActive ? "default" : "outline"}
                            className={sensor.isActive ? "bg-green-500 hover:bg-green-600" : ""}
                        >
                            {sensor.isActive ? "Activo" : "Inactivo"}
                        </Badge>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-4">
                            <div className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full">{getSensorIcon(sensor.type)}</div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {sensor.type === "temperature" && "Temperatura"}
                                    {sensor.type === "motion" && "Movimiento"}
                                    {sensor.type === "humidity" && "Humedad"}
                                    {sensor.type === "air" && "Calidad del Aire"}
                                    {sensor.type === "light" && "Iluminación"}
                                    {sensor.type === "proximity" && "Proximidad"}
                                </p>
                                <div className="flex items-baseline">
                                    <h3 className="text-2xl font-bold">{sensor.value}</h3>
                                    {sensor.unit && <span className="ml-1 text-gray-500 dark:text-gray-400">{sensor.unit}</span>}
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Actualizado: {sensor.lastUpdated}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

