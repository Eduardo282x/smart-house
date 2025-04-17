import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Lightbulb, Power } from "lucide-react"
import { lightData, LightFixture } from "./lighting.data"


export const LightingControl = () => {
    const [lights, setLights] = useState<LightFixture[]>(lightData)

    const toggleLight = (id: string) => {
        setLights(lights.map((light) => (light.id === id ? { ...light, status: !light.status } : light)))
    }

    const toggleAllLights = (area: string, status: boolean) => {
        setLights(lights.map((light) => (light.area === area ? { ...light, status } : light)))
    }

    const areas = ["Todos", "Entrada", "Salon 1", "Salon 2", "Comedor"]

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Control de Luces</h2>
                <Button variant="outline" onClick={() => setLights(lights.map((light) => ({ ...light, status: false })))}>
                    <Power className="mr-2 h-4 w-4" /> Turn Off All Lights
                </Button>
            </div>

            <Tabs defaultValue="Entrada">
                <TabsList className="grid grid-cols-5 mb-4">
                    {areas.map((area) => (
                        <TabsTrigger key={area} value={area}>
                            {area}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {areas.map((area) => (
                    <TabsContent key={area} value={area}>
                        <Card>
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <CardTitle>{area} Luces</CardTitle>
                                    <div className="flex space-x-4">
                                        <Button variant="outline" size="sm" onClick={() => toggleAllLights(area, true)}>
                                            Turn All On
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={() => toggleAllLights(area, false)}>
                                            Turn All Off
                                        </Button>
                                    </div>
                                </div>
                                <CardDescription>Control the lighting in the {area.toLowerCase()}.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4 md:grid-cols-2">
                                    {lights
                                        .filter((light) => light.area === area)
                                        .map((light) => (
                                            <Card
                                                key={light.id}
                                                className={`border-l-4 ${light.status ? "border-l-yellow-400" : "border-l-gray-300"}`}
                                            >
                                                <CardContent className="p-4">
                                                    <div className="flex justify-between items-center">
                                                        <div className="flex items-center space-x-4">
                                                            <div
                                                                className={`p-2 rounded-full ${light.status ? "bg-yellow-100 text-yellow-600" : "bg-gray-100 text-gray-400"}`}
                                                            >
                                                                <Lightbulb className="h-5 w-5" />
                                                            </div>
                                                            <div>
                                                                <p className="font-medium">{light.name}</p>
                                                                <p className="text-sm text-muted-foreground">
                                                                    {light.type} • {light.consumption} W/h
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <Switch checked={light.status} onCheckedChange={() => toggleLight(light.id)} />
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}

