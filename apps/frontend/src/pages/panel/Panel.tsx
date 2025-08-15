import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Thermometer, Eye, Droplets, Wind, Lightbulb, AlertTriangle } from "lucide-react"
import { SensorType } from "./panel.data"
import { Reading } from "@/service/readings/reading.interface"
import { timeAgo } from "@/lib/formatters"
import { Button } from "@/components/ui/button"

interface PanelProps {
    setTurnOnLight: (turn: boolean) => void;
    turnOLight: boolean;
    loading: boolean;
    sensors: Reading[]
}
export const Panel = ({ sensors, loading, setTurnOnLight, turnOLight }: PanelProps) => {

    const getSensorIcon = (type: SensorType) => {
        switch (type) {
            case "Temperatura":
                return <Thermometer className="h-5 w-5" />
            case "Gas":
                return <Eye className="h-5 w-5" />
            case "humidity":
                return <Droplets className="h-5 w-5" />
            case "air":
                return <Wind className="h-5 w-5" />
            case "light":
                return <Lightbulb className="h-5 w-5" />
            case "Proximidad":
                return <AlertTriangle className="h-5 w-5" />
        }
    }

    return (
        <div>
            {loading && (
                <div>
                    <div className='w-full h-full flex items-center justify-center'>
                        <div className="w-10 h-10 border-[4px] border-solid border-gray-400 rounded-full border-t-blue-800 animate-spin">
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sensors.map((sensor) => (
                    <Card key={sensor.id} className="overflow-hidden border-gray-200 dark:border-gray-700">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-md font-medium">{sensor.sensor.name}</CardTitle>
                            <Badge
                                variant={sensor.active ? "default" : "outline"}
                                className={sensor.active ? "bg-red-500 hover:bg-red-600" : ""}
                            >
                                {sensor.active ? "Alerta" : "Sin alerta"}
                            </Badge>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center space-x-4">
                                <div className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full">{getSensorIcon(sensor.sensor.type)}</div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {sensor.sensor.type}
                                    </p>
                                    <div className="flex items-baseline">
                                        <h3 className="text-2xl font-bold">{sensor.value}</h3>
                                        {sensor.unit && <span className="ml-1 text-gray-500 dark:text-gray-400">{sensor.unit}</span>}
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Actualizado: {timeAgo(sensor.createdAt)}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {!loading && (
                    <Button className="bg-blue-800 hover:bg-blue-700" onClick={() => setTurnOnLight(!turnOLight)}>{turnOLight ? 'Apagar' : 'Prender'} Luz</Button>
                )}
            </div>
        </div>
    )
}

