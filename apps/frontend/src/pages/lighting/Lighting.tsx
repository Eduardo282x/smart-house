import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Lightbulb, Power } from "lucide-react"

interface LightFixture {
    id: string
    name: string
    area: string
    type: string
    status: boolean
    consumption: number
}

export const LightingControl = () => {
    const [lights, setLights] = useState<LightFixture[]>([
        { id: "l1", name: "Main Entrance Light 1", area: "Entrance", type: "LED", status: true, consumption: 12 },
        { id: "l2", name: "Main Entrance Light 2", area: "Entrance", type: "LED", status: true, consumption: 12 },
        { id: "l3", name: "Classroom 1 Light 1", area: "Classroom 1", type: "Fluorescent", status: true, consumption: 18 },
        { id: "l4", name: "Classroom 1 Light 2", area: "Classroom 1", type: "Fluorescent", status: false, consumption: 18 },
        { id: "l5", name: "Classroom 2 Light 1", area: "Classroom 2", type: "LED", status: true, consumption: 15 },
        { id: "l6", name: "Classroom 2 Light 2", area: "Classroom 2", type: "LED", status: true, consumption: 15 },
        { id: "l7", name: "Dining Area Light 1", area: "Dining Area", type: "LED", status: true, consumption: 20 },
        { id: "l8", name: "Dining Area Light 2", area: "Dining Area", type: "LED", status: false, consumption: 20 },
    ])

    const toggleLight = (id: string) => {
        setLights(lights.map((light) => (light.id === id ? { ...light, status: !light.status } : light)))
    }

    const toggleAllLights = (area: string, status: boolean) => {
        setLights(lights.map((light) => (light.area === area ? { ...light, status } : light)))
    }

    const areas = ["Entrance", "Classroom 1", "Classroom 2", "Dining Area"]

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Lighting Control</h2>
                <Button variant="outline" onClick={() => setLights(lights.map((light) => ({ ...light, status: false })))}>
                    <Power className="mr-2 h-4 w-4" /> Turn Off All Lights
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

                {areas.map((area) => (
                    <TabsContent key={area} value={area}>
                        <Card>
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <CardTitle>{area} Lights</CardTitle>
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

