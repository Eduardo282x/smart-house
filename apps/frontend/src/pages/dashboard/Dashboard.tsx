import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LayoutGrid, Settings, Bell } from "lucide-react"
import { Panel } from "../panel/Panel"
import { SensorConfigPanel } from "../sensor-config-panel/SensorConfigPanel"
import { ConnectionStatus } from "../connection-status/ConnectionStatus"
import { AlertsPanel } from "../alertPanel/AlertPanel"
import { MdDeviceHub } from "react-icons/md";
import { Sensors } from "../sensors/Sensors"

export const Dashboard = () => {
    const [isConnected, setIsConnected] = useState(true)

    const handleReconnect = () => {
        // Simulate reconnection
        setIsConnected(false)
        setTimeout(() => setIsConnected(true), 2000)
    }

    return (
        <div className="container mx-auto p-4 space-y-6">
            <header className="flex justify-between items-center py-4">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Sistema Domótico</h1>
                <ConnectionStatus isConnected={isConnected} onReconnect={handleReconnect} />
            </header>

            <Tabs defaultValue="main" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-8">
                    <TabsTrigger value="main" className="flex items-center gap-2">
                        <LayoutGrid className="h-4 w-4" />
                        <span className="hidden sm:inline">Panel Principal</span>
                    </TabsTrigger>
                    <TabsTrigger value="sensors" className="flex items-center gap-2">
                        <MdDeviceHub  className="h-4 w-4" />
                        <span className="hidden sm:inline">Sensores</span>
                    </TabsTrigger>
                    <TabsTrigger value="config" className="flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        <span className="hidden sm:inline">Configuración</span>
                    </TabsTrigger>
                    <TabsTrigger value="alerts" className="flex items-center gap-2">
                        <Bell className="h-4 w-4" />
                        <span className="hidden sm:inline">Alertas</span>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="main" className="mt-0">
                    <Panel />
                </TabsContent>

                <TabsContent value="config" className="mt-0">
                    <SensorConfigPanel />
                </TabsContent>

                <TabsContent value="sensors" className="mt-0">
                    <Sensors />
                </TabsContent>

                <TabsContent value="alerts" className="mt-0">
                    <AlertsPanel />
                </TabsContent>
            </Tabs>
        </div>
    )
}

