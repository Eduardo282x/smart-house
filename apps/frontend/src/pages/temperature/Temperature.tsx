import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Thermometer, Power } from "lucide-react"

interface AirConditioner {
    id: string
    name: string
    area: string
    status: boolean
    temperature: number
    consumption: number
}

export const TemperatureControl = () => {
    const [airConditioners, setAirConditioners] = useState<AirConditioner[]>([
        { id: "ac1", name: "Main Entrance AC", area: "Entrance", status: true, temperature: 23, consumption: 120 },
        { id: "ac2", name: "Classroom 1 AC", area: "Classroom 1", status: true, temperature: 22, consumption: 150 },
        { id: "ac3", name: "Classroom 2 AC", area: "Classroom 2", status: true, temperature: 21, consumption: 180 },
        { id: "ac4", name: "Dining Area AC", area: "Dining Area", status: false, temperature: 24, consumption: 160 },
    ])

    const toggleAC = (id: string) => {
        setAirConditioners(airConditioners.map((ac) => (ac.id === id ? { ...ac, status: !ac.status } : ac)))
    }

    const changeTemperature = (id: string, temperature: number) => {
        setAirConditioners(airConditioners.map((ac) => (ac.id === id ? { ...ac, temperature } : ac)))
    }

    const areas = ["Entrance", "Classroom 1", "Classroom 2", "Dining Area"]

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Temperature Control</h2>
                <Button
                    variant="outline"
                    onClick={() => setAirConditioners(airConditioners.map((ac) => ({ ...ac, status: false })))}
                >
                    <Power className="mr-2 h-4 w-4" /> Turn Off All ACs
                </Button>
            </div>

            <Tabs defaultValue="Entrance">
                <TabsList className="grid grid-cols-4 mb-4">
                    {areas.map((area) => (
                        <TabsTrigger key={area} value={area}>
                            {area}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {areas.map((area) => {
                    const areaACs = airConditioners.filter((ac) => ac.area === area)

                    return (
                        <TabsContent key={area} value={area}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>{area} Temperature Control</CardTitle>
                                    <CardDescription>Adjust the temperature settings for the {area.toLowerCase()}.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        {areaACs.map((ac) => (
                                            <Card
                                                key={ac.id}
                                                className={`border-l-4 ${ac.status ? "border-l-orange-400" : "border-l-gray-300"}`}
                                            >
                                                <CardContent className="p-6">
                                                    <div className="flex flex-col space-y-4">
                                                        <div className="flex justify-between items-center">
                                                            <div className="flex items-center space-x-4">
                                                                <div
                                                                    className={`p-2 rounded-full ${ac.status ? "bg-orange-100 text-orange-600" : "bg-gray-100 text-gray-400"}`}
                                                                >
                                                                    <Thermometer className="h-5 w-5" />
                                                                </div>
                                                                <div>
                                                                    <p className="font-medium">{ac.name}</p>
                                                                    <p className="text-sm text-muted-foreground">
                                                                        Current consumption: {ac.consumption} W/h
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <Switch checked={ac.status} onCheckedChange={() => toggleAC(ac.id)} />
                                                        </div>

                                                        <div className="pt-4">
                                                            <div className="flex justify-between items-center mb-2">
                                                                <span className="text-sm font-medium">Temperature</span>
                                                                <span className="text-2xl font-bold text-orange-500">{ac.temperature}°C</span>
                                                            </div>
                                                            <Slider
                                                                disabled={!ac.status}
                                                                value={[ac.temperature]}
                                                                min={18}
                                                                max={28}
                                                                step={1}
                                                                onValueChange={(value) => changeTemperature(ac.id, value[0])}
                                                                className={ac.status ? "" : "opacity-50"}
                                                            />
                                                            <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                                                <span>18°C</span>
                                                                <span>23°C</span>
                                                                <span>28°C</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    )
                })}
            </Tabs>
        </div>
    )
}

