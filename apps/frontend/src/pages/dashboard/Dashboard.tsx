import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {  Lightbulb, Thermometer, Users } from "lucide-react"
import { AreaConsumptionChart } from "./components/area-consumption"
import { EnergyConsumptionChart } from "../energy/Energy"

export const DashboardView = () => {
    return (
        <div className="space-y-6 w-full">
            <h2 className="text-2xl font-bold text-black">Inicio</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-green-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total de energía</CardTitle>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4 w-4 text-green-600"
                        >
                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">142.8 kWh</div>
                        <p className="text-xs text-muted-foreground">-2% desde ayer</p>
                    </CardContent>
                </Card>
                <Card className="border-yellow-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Luces</CardTitle>
                        <Lightbulb className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">48.2 kWh</div>
                        <p className="text-xs text-muted-foreground">+1.2% desde ayer</p>
                    </CardContent>
                </Card>
                <Card className="border-orange-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Temperatura</CardTitle>
                        <Thermometer className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">94.6 kWh</div>
                        <p className="text-xs text-muted-foreground">-4% desde ayer</p>
                    </CardContent>
                </Card>
                <Card className="border-blue-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Acceso</CardTitle>
                        <Users className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">42 personas</div>
                        <p className="text-xs text-muted-foreground">Actualmente en el edificio</p>
                    </CardContent>
                </Card>
            </div>

            {/* <Alert variant="destructive" className="bg-red-50 border-red-200">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Alert</AlertTitle>
                <AlertDescription>Salon 2 air conditioning unit has exceeded average consumption by 15%.</AlertDescription>
            </Alert> */}

            <Tabs defaultValue="consumption" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="consumption">Consumo energético</TabsTrigger>
                    <TabsTrigger value="areas">Areas</TabsTrigger>
                </TabsList>
                <TabsContent value="consumption" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Consumo energético</CardTitle>
                            <CardDescription>Energía usada en las ultimas 24 horas.</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[300px]">
                            <EnergyConsumptionChart />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="areas" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Energía por area</CardTitle>
                            <CardDescription>Consumo de energía actual por area</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[300px]">
                            <AreaConsumptionChart />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

