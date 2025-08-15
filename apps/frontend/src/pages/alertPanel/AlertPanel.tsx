import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Trash2, Plus, Bell } from "lucide-react"
import { createAlert, deleteAlert, getAllAlerts, updateAlert } from "@/service/alert/alert.service"
import { Sensor } from "../panel/panel.data"
import { getSensors } from "@/service/sensor/sensor.service"
import { AlertBody } from "@/service/alert/alert.interface"
import { formatDateShort } from "@/lib/formatters"

export interface IAlert {
    id: number;
    sensorId: number;
    name: string;
    condition: ConditionAlerts;
    action: ActionAlerts;
    threshold: number;
    isEnabled: boolean;
    createdAt: Date;
    sensor: Sensor;
}

export type ActionAlerts = 'notify' | 'light' | 'fan' | 'alarm';
type ConditionAlerts = 'greater' | 'less' | 'equal';

export const AlertsPanel = () => {
    const [alertRules, setAlertRules] = useState<IAlert[]>([]);
    const [sensors, setSensors] = useState<Sensor[]>([]);

    const [newAlert, setNewAlert] = useState<AlertBody>({
        sensorId: 0,
        name: '',
        condition: '',
        action: '',
        threshold: 0,
        isEnabled: true
    });

    const [showNewRule, setShowNewRule] = useState(false)

    const toggleRuleStatus = async (id: number) => {
        setAlertRules(alertRules.map((rule) => (rule.id === id ? { ...rule, isEnabled: !rule.isEnabled } : rule)))
        const findAlert = alertRules.find(item => item.id == id) as IAlert;
        await updateAlert(id, { ...findAlert, isEnabled: !findAlert.isEnabled })
        await getAlertApi();
    }

    const deleteRule = async (id: number) => {
        await deleteAlert(id)
        await getAlertApi();
    }

    const addNewRule = async () => {
        await createAlert(newAlert)
        await getAlertApi();
        setShowNewRule(false)
    }

    useEffect(() => {
        getAlertApi();
        getSensorApi();
    }, [])

    const getAlertApi = async () => {
        const response = await getAllAlerts();
        setAlertRules(response);
    }
    const getSensorApi = async () => {
        const response = await getSensors();
        setSensors(response);
    }

    const setActionDescription = (action: ActionAlerts): string => {
        switch (action) {
            case 'light':
                return 'Encender luz';
            case 'notify':
                return 'Enviar notificación';
            case 'fan':
                return 'Activar ventilador ';
            default:
                return ''
        }
    }

    const setConditionDescription = (action: ConditionAlerts): string => {
        switch (action) {
            case 'greater':
                return '>';
            case 'less':
                return '<';
            case 'equal':
                return '=';
            default:
                return ''
        }
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Reglas de Alerta</CardTitle>
                            <CardDescription>Configura acciones automáticas basadas en los valores de los sensores</CardDescription>
                        </div>
                        <Button onClick={() => setShowNewRule(true)} className="flex items-center gap-1 bg-green-700 hover:bg-green-600">
                            <Plus className="h-4 w-4" />
                            Nueva Regla
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {showNewRule && (
                        <Card className="mb-6 border-dashed">
                            <CardContent className="pt-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <div className="space-y-2 mb-6">
                                            <Label htmlFor="value">Nombre</Label>
                                            <Input id="value" type="text" placeholder="Nombre de la alerta" className="w-80" onChange={(e) => setNewAlert(prev => ({ ...prev, name: e.target.value }))} />
                                        </div>

                                        <div className="space-y-2 mb-6">
                                            <Label htmlFor="sensor">Sensor</Label>
                                            <Select
                                                value={newAlert.sensorId.toString()}
                                                onValueChange={(value) => setNewAlert(prev => ({ ...prev, sensorId: Number(value) }))}
                                            >
                                                <SelectTrigger id="sensor" className="w-80">
                                                    <SelectValue placeholder="Seleccionar sensor" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {sensors.map(item => (
                                                        <SelectItem value={item.id.toString()} key={item.id}>{item.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="action">Acción</Label>
                                            <Select
                                                value={newAlert.action}
                                                onValueChange={(value) => setNewAlert(prev => ({ ...prev, action: value }))}
                                            >
                                                <SelectTrigger id="action" className="w-80">
                                                    <SelectValue placeholder="Seleccionar acción" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="notify">Enviar notificación</SelectItem>
                                                    <SelectItem value="light">Encender luz</SelectItem>
                                                    <SelectItem value="fan">Activar ventilador</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="condition">Condición</Label>
                                            <Select
                                                defaultValue="greater"
                                                onValueChange={(value) => setNewAlert(prev => ({ ...prev, condition: value }))}>
                                                <SelectTrigger id="condition">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="greater">Mayor que</SelectItem>
                                                    <SelectItem value="less">Menor que</SelectItem>
                                                    <SelectItem value="equal">Igual a</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="col-span-2 space-y-2">
                                            <Label htmlFor="value">Valor</Label>
                                            <Input id="value" type="number" placeholder="Valor" onChange={(e) => setNewAlert(prev => ({ ...prev, threshold: Number(e.target.value) }))} />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-2">
                                    <Button variant="outline" onClick={() => setShowNewRule(false)}>
                                        Cancelar
                                    </Button>
                                    <Button
                                        className="bg-blue-700 hover:bg-blue-500"
                                        onClick={addNewRule}>Guardar Regla</Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {alertRules.length === 0 ? (
                        <div className="text-center py-8">
                            <Bell className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">No hay reglas configuradas</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Comienza creando una nueva regla de alerta.
                            </p>
                        </div>
                    ) : (
                        <ul className="space-y-3">
                            {alertRules.map((rule) => (
                                <li
                                    key={rule.id}
                                    className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg"
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <p className="font-medium">
                                                {rule.sensor.name} {setConditionDescription(rule.condition)} {rule.threshold}
                                            </p>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">→</span>
                                            <p className="text-sm text-gray-700 dark:text-gray-300">{setActionDescription(rule.action)}</p>
                                        </div>
                                        <p className="text-sm mt-2">Agregado: {formatDateShort(rule.createdAt)} </p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center space-x-2">
                                            <Switch
                                                id={`rule-${rule.id}`}
                                                checked={rule.isEnabled}
                                                onCheckedChange={() => toggleRuleStatus(rule.id)}
                                            />
                                            <Label htmlFor={`rule-${rule.id}`} className="text-sm">
                                                {rule.isEnabled ? "Activa" : "Inactiva"}
                                            </Label>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => deleteRule(rule.id)}
                                            className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            <span className="sr-only">Eliminar</span>
                                        </Button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </CardContent>
            </Card >
        </div >
    )
}

