/* eslint-disable @typescript-eslint/no-explicit-any */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Activity, Filter } from "lucide-react"
import { Reading } from '@/service/readings/reading.interface';
import { generateReadingsExcel, getLastedReadings, getReadingSinceTime } from '@/service/readings/readings.service';
import { useEffect, useMemo, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { RiFileExcel2Line } from "react-icons/ri";
import { useSocket } from "@/service/socket.io";

export const Readings = () => {
    const [readingData, setReadingData] = useState<Reading[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedSensor, setSelectedSensor] = useState<string>("all")
    const [time, setTime] = useState<string>('24h')

    const sensors = useMemo(() => {
        const uniqueSensors = readingData.reduce(
            (acc, reading) => {
                if (!acc.find((s) => s.id === reading.sensor.id)) {
                    acc.push(reading.sensor)
                }
                return acc
            },
            [] as Reading["sensor"][],
        )
        return uniqueSensors
    }, [readingData]);

    const chartData = useMemo(() => {
        if (selectedSensor !== "all") {
            // Single sensor view
            const filteredReadingData = readingData.filter((r) => r.sensor.id.toString() === selectedSensor)
            return filteredReadingData
                .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
                .map((reading) => ({
                    time: new Date(reading.createdAt).toLocaleTimeString("es-ES", {
                        hour: "2-digit",
                        minute: "2-digit",
                    }),
                    value: reading.value,
                    formattedTime: new Date(reading.createdAt).toLocaleString("es-ES"),
                    sensorName: reading.sensor.name,
                    unit: reading.unit,
                    sensorId: reading.sensor.id,
                }))
        } else {
            // Multiple sensors view - group by time
            const timeGroups = new Map<string, any>()

            readingData
                .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
                .forEach((reading) => {
                    const timeKey = new Date(reading.createdAt).toLocaleTimeString("es-ES", {
                        hour: "2-digit",
                        minute: "2-digit",
                    })

                    if (!timeGroups.has(timeKey)) {
                        timeGroups.set(timeKey, {
                            time: timeKey,
                            formattedTime: new Date(reading.createdAt).toLocaleString("es-ES"),
                        })
                    }

                    const group = timeGroups.get(timeKey)
                    group[`sensor_${reading.sensor.id}`] = reading.value
                    group[`sensor_${reading.sensor.id}_unit`] = reading.unit
                    group[`sensor_${reading.sensor.id}_name`] = reading.sensor.name
                })

            return Array.from(timeGroups.values())
        }
    }, [readingData, selectedSensor])

    const getChartColor = (sensorType: string) => {
        switch (sensorType) {
            case "Temperatura":
                return "#ef4444"
            case "Humedad":
                return "#3b82f6"
            case "Proximidad":
                return "#10b981"
            default:
                return "#6b7280"
        }
    }

    useEffect(() => {
        getReadingDataDataApi(time)
    }, [time]);

    useSocket('updateReading', (data: string) => {
        if (data) {
            getReadingLastedDataDataApi()
        }
    })

    const getExportData = async () => {
        const response = await generateReadingsExcel() as Blob;
        const url = URL.createObjectURL(response)
        const link = window.document.createElement("a")
        link.href = url
        link.download = `Reporte de Lecturas.xlsx`;
        window.document.body.appendChild(link)
        link.click()
        window.document.body.removeChild(link)
        URL.revokeObjectURL(url)
    }

    const getReadingDataDataApi = async (time: string) => {
        setLoading(true);
        const response = await getReadingSinceTime(time);
        setReadingData(response);
        setLoading(false);
    };

    const getReadingLastedDataDataApi = async () => {
        const response = await getLastedReadings();
        setReadingData(prev => ([...prev, response]))
    };

    return (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <Activity className="h-5 w-5" />
                                Historial de Lecturas
                            </CardTitle>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                Visualiza los datos históricos de tus sensores
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Select value={time} onValueChange={setTime}>
                                <SelectTrigger className="w-20">
                                    <SelectValue placeholder="Filtrar por tiempo" />
                                </SelectTrigger>
                                <SelectContent>
                                    {['24h', '12h', '6h', '2h', '1h', '45min', '30min', '15min', '10min', '5min'].map((minutes) => (
                                        <SelectItem key={minutes} value={minutes}>
                                            {minutes}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select value={selectedSensor} onValueChange={setSelectedSensor}>
                                <SelectTrigger className="w-[200px]">
                                    <SelectValue placeholder="Filtrar por sensor" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todos los sensores</SelectItem>
                                    {sensors.map((sensor) => (
                                        <SelectItem key={sensor.id} value={sensor.id.toString()}>
                                            {sensor.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Button
                                onClick={getExportData}
                                className="bg-transparent hover:bg-gray-100 border border-gray-300 text-black">
                                <RiFileExcel2Line className="text-green-600" />
                                Exportar
                            </Button>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            {/* Chart */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span>Gráfica de Lecturas</span>
                        {selectedSensor !== "all" && (
                            <Badge variant="outline">{sensors.find((s) => s.id.toString() === selectedSensor)?.name}</Badge>
                        )}

                        {
                            selectedSensor === "all" && (
                                <div className="mt-4 flex flex-wrap gap-4 justify-center">
                                    {sensors.map((sensor) => (
                                        <div key={sensor.id} className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getChartColor(sensor.type) }} />
                                            <span className="text-sm text-gray-600 dark:text-gray-400">{sensor.name}</span>
                                        </div>
                                    ))}
                                </div>
                            )
                        }

                        {selectedSensor == 'all' && (
                            <div className="text-transparent">
                                a
                            </div>
                        )}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {chartData.length === 0 ? (
                        <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
                            {loading ? (
                                <div>
                                    <div className='w-full h-full flex items-center justify-center'>
                                        <div className="w-10 h-10 border-[4px] border-solid border-gray-400 rounded-full border-t-blue-800 animate-spin">
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <Filter className="mx-auto h-12 w-12 mb-4" />
                                    <p>No hay datos para mostrar</p>
                                    <p className="text-sm">Selecciona un sensor diferente o verifica las lecturas</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                                    <XAxis dataKey="time" tick={{ fontSize: 12 }} tickLine={{ stroke: "#6b7280" }} />
                                    <YAxis tick={{ fontSize: 12 }} tickLine={{ stroke: "#6b7280" }} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "hsl(var(--card))",
                                            border: "1px solid hsl(var(--border))",
                                            borderRadius: "8px",
                                        }}
                                        formatter={(value: any, name: any) => {
                                            if (selectedSensor !== "all") {
                                                return [`${value} ${chartData[0]?.unit || ""}`, "Valor"]
                                            } else {
                                                // For multiple sensors, extract sensor info from dataKey
                                                const sensorId = name.replace("sensor_", "")
                                                const sensor = sensors.find((s) => s.id.toString() === sensorId)
                                                const unit =
                                                    chartData.find((d) => d[`sensor_${sensorId}_unit`])?.[`sensor_${sensorId}_unit`] || ""
                                                return [`${value} ${unit}`, sensor?.name || `Sensor ${sensorId}`]
                                            }
                                        }}
                                        labelFormatter={(label) => `Hora: ${label}`}
                                    />
                                    {selectedSensor !== "all" ? (
                                        <Line
                                            type="monotone"
                                            dataKey="value"
                                            stroke={getChartColor(sensors.find((s) => s.id.toString() === selectedSensor)?.type || "")}
                                            strokeWidth={2}
                                            dot={{
                                                fill: getChartColor(sensors.find((s) => s.id.toString() === selectedSensor)?.type || ""),
                                                strokeWidth: 2,
                                                r: 4,
                                            }}
                                        />
                                    ) : (
                                        // Multiple lines for all sensors
                                        sensors.map((sensor) => (
                                            <Line
                                                key={sensor.id}
                                                type="monotone"
                                                dataKey={`sensor_${sensor.id}`}
                                                stroke={getChartColor(sensor.type)}
                                                strokeWidth={2}
                                                name={`sensor_${sensor.id}`}
                                                dot={{
                                                    fill: getChartColor(sensor.type),
                                                    strokeWidth: 2,
                                                    r: 4,
                                                }}
                                                connectNulls={false}
                                            />
                                        ))
                                    )}
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div >
    )
}
