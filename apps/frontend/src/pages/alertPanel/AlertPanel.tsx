import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Trash2, Plus, Bell } from "lucide-react"

interface AlertRule {
    id: string
    sensor: string
    condition: string
    value: string
    action: string
    isActive: boolean
}

export const AlertsPanel = () => {
    const [alertRules, setAlertRules] = useState<AlertRule[]>([
        {
            id: "1",
            sensor: "Sensor Cocina",
            condition: ">",
            value: "30",
            action: "Enviar notificación",
            isActive: true,
        },
        {
            id: "2",
            sensor: "Detector Entrada",
            condition: "=",
            value: "Movimiento detectado",
            action: "Encender luz",
            isActive: false,
        },
        {
            id: "3",
            sensor: "Humedad Baño",
            condition: ">",
            value: "80",
            action: "Activar ventilador",
            isActive: true,
        },
    ])

    const [showNewRule, setShowNewRule] = useState(false)

    const toggleRuleStatus = (id: string) => {
        setAlertRules(alertRules.map((rule) => (rule.id === id ? { ...rule, isActive: !rule.isActive } : rule)))
    }

    const deleteRule = (id: string) => {
        setAlertRules(alertRules.filter((rule) => rule.id !== id))
    }

    const addNewRule = () => {
        const newRule: AlertRule = {
            id: `rule-${Date.now()}`,
            sensor: "",
            condition: ">",
            value: "",
            action: "",
            isActive: true,
        }
        setAlertRules([...alertRules, newRule])
        setShowNewRule(false)
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
                        <Button onClick={() => setShowNewRule(true)} className="flex items-center gap-1">
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
                                    <div className="space-y-2">
                                        <Label htmlFor="sensor">Sensor</Label>
                                        <Select>
                                            <SelectTrigger id="sensor">
                                                <SelectValue placeholder="Seleccionar sensor" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="sensor1">Sensor Cocina</SelectItem>
                                                <SelectItem value="sensor2">Detector Entrada</SelectItem>
                                                <SelectItem value="sensor3">Humedad Baño</SelectItem>
                                                <SelectItem value="sensor4">Calidad Aire</SelectItem>
                                                <SelectItem value="sensor5">Luz Salón</SelectItem>
                                                <SelectItem value="sensor6">Proximidad Garaje</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="grid grid-cols-3 gap-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="condition">Condición</Label>
                                            <Select defaultValue=">">
                                                <SelectTrigger id="condition">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value=">">Mayor que</SelectItem>
                                                    <SelectItem value="<">Menor que</SelectItem>
                                                    <SelectItem value="=">Igual a</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="col-span-2 space-y-2">
                                            <Label htmlFor="value">Valor</Label>
                                            <Input id="value" placeholder="Valor" />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2 mb-6">
                                    <Label htmlFor="action">Acción</Label>
                                    <Select>
                                        <SelectTrigger id="action">
                                            <SelectValue placeholder="Seleccionar acción" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="notify">Enviar notificación</SelectItem>
                                            <SelectItem value="light">Encender luz</SelectItem>
                                            <SelectItem value="fan">Activar ventilador</SelectItem>
                                            <SelectItem value="alarm">Activar alarma</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex justify-end gap-2">
                                    <Button variant="outline" onClick={() => setShowNewRule(false)}>
                                        Cancelar
                                    </Button>
                                    <Button onClick={addNewRule}>Guardar Regla</Button>
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
                                                {rule.sensor} {rule.condition} {rule.value}
                                            </p>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">→</span>
                                            <p className="text-sm text-gray-700 dark:text-gray-300">{rule.action}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center space-x-2">
                                            <Switch
                                                id={`rule-${rule.id}`}
                                                checked={rule.isActive}
                                                onCheckedChange={() => toggleRuleStatus(rule.id)}
                                            />
                                            <Label htmlFor={`rule-${rule.id}`} className="text-sm">
                                                {rule.isActive ? "Activa" : "Inactiva"}
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
            </Card>
        </div>
    )
}

