import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDateShort } from "@/lib/formatters";
import { ISensor } from "@/service/sensor/sensor.interface"
import { getSensors } from "@/service/sensor/sensor.service";
import { useEffect, useState } from "react";

export const Sensors = () => {
    const [sensors, setSensors] = useState<ISensor[]>([]);

    useEffect(() => {
        getSensorsAPI();
    }, [])

    const getSensorsAPI = async () => {
        const response: ISensor[] = await getSensors();
        setSensors(response)
    }
    return (
        <div>

            <div className="flex items-center justify-between w-full mb-4 px-4">
                <p className="text-2xl font-semibold">Sensores</p>
                <Button>Agregar sensor</Button>
            </div>
            <div className="flex flex-col gap-2">
                {sensors && sensors.map((item: ISensor, index: number) => (
                    <SensorCard key={index} sensor={item} />
                ))}
            </div>
        </div>
    )
}

interface SensorCardProps {
    sensor: ISensor;
}

const SensorCard = ({ sensor }: SensorCardProps) => {
    return (
        <Card key={sensor.id} className="overflow-hidden border-gray-200 dark:border-gray-700">
            <CardHeader className="flex items-center justify-between">
                <CardTitle className="text-md font-medium">{sensor.name}</CardTitle>
                <Badge
                    variant={sensor.isActive ? "default" : "outline"}
                    className={sensor.isActive ? "bg-green-500 hover:bg-green-600" : ""}
                >
                    {sensor.isActive ? "Activo" : "Inactivo"}
                </Badge>
            </CardHeader>
            <CardContent>
                <div className="flex items-center w-full">
                    {/* <div className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full">{getSensorIcon(sensor.type)}</div> */}
                    <div className="w-full">
                        <p className="mb-2">
                            <strong>Tipo:</strong> <span className="capitalize">{sensor.type}</span>
                        </p>
                        {/* <div className="flex items-baseline">
                            <h3 className="text-2xl font-bold">{sensor.value}</h3>
                            {sensor.unit && <span className="ml-1 text-gray-500 dark:text-gray-400">{sensor.unit}</span>}
                        </div> */}
                        <div className="w-full text-right">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Creado: {formatDateShort(sensor.createdAt)}</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}