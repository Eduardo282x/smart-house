"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, Edit, Save, X, Thermometer, Eye, Droplets, Wind, Lightbulb, AlertTriangle } from "lucide-react"

interface DetectedSensor {
    id: string
    port: string
    type: string
    isSynced: boolean
}

interface SyncedSensor {
    id: string
    name: string
    type: string
    port: string
    isEditing?: boolean
}

export const SensorConfigPanel = () => {
    const [detectedSensors, setDetectedSensors] = useState<DetectedSensor[]>([
        { id: "d1", port: "COM3", type: "Temperatura", isSynced: false },
        { id: "d2", port: "COM4", type: "Movimiento", isSynced: false },
        { id: "d3", port: "COM5", type: "Desconocido", isSynced: false },
    ])

    const [syncedSensors, setSyncedSensors] = useState<SyncedSensor[]>([
        { id: "s1", name: "Sensor Cocina", type: "Temperatura", port: "COM1" },
        { id: "s2", name: "Detector Entrada", type: "Movimiento", port: "COM2" },
    ])

    const handleSync = (sensor: DetectedSensor) => {
        // Remove from detected list
        setDetectedSensors(detectedSensors.filter((s) => s.id !== sensor.id))

        // Add to synced list with a default name
        setSyncedSensors([
            ...syncedSensors,
            {
                id: `s${Date.now()}`,
                name: `Nuevo ${sensor.type}`,
                type: sensor.type,
                port: sensor.port,
                isEditing: false,
            },
        ])
    }

    const handleDelete = (id: string) => {
        setSyncedSensors(syncedSensors.filter((s) => s.id !== id))
    }

    const toggleEdit = (id: string) => {
        setSyncedSensors(syncedSensors.map((s) => (s.id === id ? { ...s, isEditing: !s.isEditing } : s)))
    }

    const updateSensor = (id: string, name: string, type: string) => {
        setSyncedSensors(syncedSensors.map((s) => (s.id === id ? { ...s, name, type, isEditing: false } : s)))
    }

    const getSensorIcon = (type: string) => {
        switch (type.toLowerCase()) {
            case "temperatura":
                return <Thermometer className="h-5 w-5" />
            case "movimiento":
                return <Eye className="h-5 w-5" />
            case "humedad":
                return <Droplets className="h-5 w-5" />
            case "aire":
                return <Wind className="h-5 w-5" />
            case "luz":
                return <Lightbulb className="h-5 w-5" />
            case "proximidad":
                return <AlertTriangle className="h-5 w-5" />
            default:
                return <AlertTriangle className="h-5 w-5" />
        }
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Sensores Detectados</CardTitle>
                </CardHeader>
                <CardContent>
                    {detectedSensors.length === 0 ? (
                        <p className="text-sm text-gray-500 dark:text-gray-400">No hay sensores nuevos detectados</p>
                    ) : (
                        <ul className="space-y-3">
                            {detectedSensors.map((sensor) => (
                                <li
                                    key={sensor.id}
                                    className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-lg"
                                >
                                    <div className="flex items-center gap-3">
                                        {getSensorIcon(sensor.type)}
                                        <div>
                                            <p className="font-medium">{sensor.type}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Puerto: {sensor.port}</p>
                                        </div>
                                    </div>
                                    <Button size="sm" onClick={() => handleSync(sensor)} className="h-8">
                                        <Plus className="h-4 w-4 mr-1" />
                                        Sincronizar
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Sensores Sincronizados</CardTitle>
                </CardHeader>
                <CardContent>
                    {syncedSensors.length === 0 ? (
                        <p className="text-sm text-gray-500 dark:text-gray-400">No hay sensores sincronizados</p>
                    ) : (
                        <ul className="space-y-3">
                            {syncedSensors.map((sensor) => (
                                <li key={sensor.id} className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                    {sensor.isEditing ? (
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2">
                                                <Input defaultValue={sensor.name} id={`name-${sensor.id}`} className="h-8" />
                                                <Select defaultValue={sensor.type}>
                                                    <SelectTrigger className="w-[180px] h-8">
                                                        <SelectValue placeholder="Tipo" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Temperatura">Temperatura</SelectItem>
                                                        <SelectItem value="Movimiento">Movimiento</SelectItem>
                                                        <SelectItem value="Humedad">Humedad</SelectItem>
                                                        <SelectItem value="Aire">Calidad del Aire</SelectItem>
                                                        <SelectItem value="Luz">Iluminación</SelectItem>
                                                        <SelectItem value="Proximidad">Proximidad</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="flex justify-end gap-2">
                                                <Button size="sm" variant="outline" onClick={() => toggleEdit(sensor.id)} className="h-8">
                                                    <X className="h-4 w-4 mr-1" />
                                                    Cancelar
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    onClick={() => {
                                                        const nameInput = document.getElementById(`name-${sensor.id}`) as HTMLInputElement
                                                        updateSensor(sensor.id, nameInput.value, sensor.type)
                                                    }}
                                                    className="h-8"
                                                >
                                                    <Save className="h-4 w-4 mr-1" />
                                                    Guardar
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                {getSensorIcon(sensor.type)}
                                                <div>
                                                    <p className="font-medium">{sensor.name}</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        {sensor.type} • Puerto: {sensor.port}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button size="sm" variant="ghost" onClick={() => toggleEdit(sensor.id)} className="h-8 w-8 p-0">
                                                    <Edit className="h-4 w-4" />
                                                    <span className="sr-only">Editar</span>
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => handleDelete(sensor.id)}
                                                    className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    <span className="sr-only">Eliminar</span>
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

