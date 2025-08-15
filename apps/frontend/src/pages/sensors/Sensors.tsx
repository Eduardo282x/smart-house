import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { formatDateShort } from "@/lib/formatters";
import { ISensor, SensorBody } from "@/service/sensor/sensor.interface"
import { createSensor, getSensors, updateSensor } from "@/service/sensor/sensor.service";
import { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export const Sensors = () => {
    const [sensors, setSensors] = useState<ISensor[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [addNew, setAddNew] = useState<boolean>(false);
    const [newSensor, setNewSensor] = useState<SensorBody>({
        name: '',
        type: '',
        pin: '',
        isActive: true
    })

    useEffect(() => {
        getSensorsAPI();
    }, [])

    const getSensorsAPI = async () => {
        setLoading(true);
        const response: ISensor[] = await getSensors();
        setSensors(response)
        setLoading(false);
    };

    const updateSensorApi = async (sensor: ISensor) => {
        setSensors(prev => prev.map(item => ({
            ...item,
            name: sensor.id == item.id ? sensor.name : item.name,
            type: sensor.id == item.id ? sensor.type : item.type,
            isActive: sensor.id == item.id ? sensor.isActive : item.isActive,
        })));

        await updateSensor(sensor.id, sensor);
    }

    const addNewSensor = async () => {
        const parseNewSensor = {
            id: sensors.length + 1,
            ...newSensor,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        setSensors(prev => [...prev, parseNewSensor]);
        await createSensor(newSensor)
        setAddNew(false);
    }
    return (
        <div>

            <div className="flex items-center justify-between w-full mb-4 px-4">
                <p className="text-2xl font-semibold">Sensores</p>
                <Button onClick={() => setAddNew(!addNew)} className="bg-blue-800 hover:bg-blue-700">Nuevo sensor</Button>
            </div>

            {loading && (
                <div>
                    <div className='w-full h-full flex items-center justify-center'>
                        <div className="w-10 h-10 border-[4px] border-solid border-gray-400 rounded-full border-t-blue-800 animate-spin">
                        </div>
                    </div>
                </div>
            )}


            <div className="flex flex-col gap-2">
                {addNew && (
                    <div className="w-full flex items-center justify-between p-4 border rounded-lg bg-white ">
                        <div className="space-y-2">
                            <Label>Nombre sensor:</Label>
                            <Input value={newSensor.name} onChange={(e) => setNewSensor(prev => ({ ...prev, name: e.target.value }))} />
                        </div>
                        <div className="space-y-2">
                            <Label>Tipo de sensor:</Label>
                            <Input value={newSensor.type} onChange={(e) => setNewSensor(prev => ({ ...prev, type: e.target.value }))} />
                        </div>
                        <div className="space-y-2">
                            <Label>Activo:</Label>
                            <Switch checked={newSensor.isActive} onCheckedChange={(value) => setNewSensor(prev => ({ ...prev, isActive: value }))} />
                        </div>
                        <Button onClick={addNewSensor} className="bg-blue-800 hover:bg-blue-700">Agregar</Button>
                    </div>
                )}
                {sensors && sensors.map((item: ISensor, index: number) => (
                    <SensorCard key={index} sensor={item} onUpdate={updateSensorApi} />
                ))}
            </div>
        </div>
    )
}

interface SensorCardProps {
    sensor: ISensor;
    onUpdate: (sensorUpdate: ISensor) => void
}

const SensorCard = ({ sensor, onUpdate }: SensorCardProps) => {

    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [nameSensor, setNameSensor] = useState<string>(sensor.name);
    const [typeSensor, setTypeSensor] = useState<string>(sensor.type);
    const [active, setActive] = useState<boolean>(sensor.isActive);

    const sendNewData = () => {
        const parseData = {
            ...sensor,
            name: nameSensor,
            type: typeSensor,
            isActive: active,
        }
        onUpdate(parseData);
        setIsEdit(false);
    }

    return (
        <Card key={sensor.id} className="overflow-hidden border-gray-200 dark:border-gray-700">
            <CardHeader className="flex items-center justify-between">
                <CardTitle className="text-md font-medium">
                    {isEdit ? (
                        <div className="flex items-center gap-2">
                            <Label>Nombre:</Label>
                            <Input value={nameSensor} onChange={(e) => setNameSensor(e.target.value)} />
                        </div>
                    ) :
                        (<span>{sensor.name}</span>)
                    }

                </CardTitle>
                <div className="flex flex-col items-center space-y-2">
                    <Button
                        size='sm'
                        onClick={() => setIsEdit(!isEdit)}
                        className="bg-transparent hover:bg-gray-100 text-black border border-gray-200">
                        Editar
                    </Button>
                    {isEdit ? (
                        <Switch checked={active} onCheckedChange={setActive} />
                    ) :
                        (
                            <Badge
                                variant={sensor.isActive ? "default" : "outline"}
                                className={sensor.isActive ? "bg-green-500 hover:bg-green-600" : ""}
                            >
                                {sensor.isActive ? "Activo" : "Inactivo"}
                            </Badge>
                        )}
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex items-center w-full">
                    {/* <div className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full">{getSensorIcon(sensor.type)}</div> */}
                    {isEdit ? (
                        <div className="w-full flex justify-between">
                            <Select value={typeSensor} onValueChange={setTypeSensor}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Temperatura">Temperatura</SelectItem>
                                    <SelectItem value="Proximidad">Proximidad</SelectItem>
                                    <SelectItem value="Gas">Gas</SelectItem>
                                </SelectContent>
                            </Select>

                            <Button onClick={sendNewData} size='sm' className="bg-blue-700 hover:bg-blue-600">Guardar</Button>
                        </div>
                    ) : (
                        <div className="w-full">

                            <p>
                                <strong>Tipo:</strong> <span className="capitalize">{sensor.type}</span>
                            </p>
                            <p>
                                <strong>Creado: </strong> <span className="capitalize">{formatDateShort(sensor.createdAt)}</span>
                            </p>
                        </div>
                    )
                    }
                </div >
            </CardContent >
        </Card >
    )
}