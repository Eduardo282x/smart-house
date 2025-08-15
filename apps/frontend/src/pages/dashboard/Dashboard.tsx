import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LayoutGrid, Bell } from "lucide-react"
import { Panel } from "../panel/Panel"
import { AlertsPanel } from "../alertPanel/AlertPanel"
import { MdDeviceHub, MdOutlineStackedLineChart } from "react-icons/md";
import { Sensors } from "../sensors/Sensors"
import { Readings } from "../reading/Readings"
import { Notifications } from "../notifications/Notifications"
import { GiComputerFan } from "react-icons/gi";
import { useEffect, useState } from "react";
import { FaLightbulb } from "react-icons/fa";
import { FaRegLightbulb } from "react-icons/fa";
import { Reading } from "@/service/readings/reading.interface";
import { getLastReadingsNew } from "@/service/readings/readings.service";
import { useSocket } from "@/service/socket.io";
import { toast } from "sonner";

export const Dashboard = () => {
    const [turnOnFan, setTurnOnFan] = useState<boolean>(false);
    const [turnOLight, setTurnOnLight] = useState<boolean>(false);
    const [sensors, setSensors] = useState<Reading[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [notifyActive, setNotifyActive] = useState<number>(0);
    
    useEffect(() => {
        getLastReadingAPI();
    }, [])

    const getLastReadingAPI = async () => {
        if (sensors.length == 0) setLoading(true)
        // const response = await getLastReadings();
        const responseNew: Reading[] = await getLastReadingsNew();
        setSensors(responseNew);

        const turnOn = responseNew.find(item => item.active && item.AlertTrigger[0].alert.action == 'fan')
        const isNotify = responseNew.find(item => item.active && item.AlertTrigger[0].alert.action == 'notify')
        setTurnOnFan(turnOn ? true : false);
        if (isNotify) {
            setNotifyActive(prev => prev+1);
            toast.warning(`Se ha activado la alerta de ${isNotify.AlertTrigger[0].alert}`, {
                position: 'top-right'
            });
        }
        setLoading(false)
    }

    useSocket('updateReading', (data: string) => {
        if (data) {
            getLastReadingAPI()
        }
    })

    return (
        <div className="container mx-auto p-4 space-y-6">
            <header className="flex justify-between items-center py-4">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Sistema Domótico</h1>
                {/* <ConnectionStatus isConnected={isConnected} onReconnect={handleReconnect} /> */}
                <div className="flex items-center gap-5">
                    {!turnOLight ? <FaRegLightbulb size={30} /> : <FaLightbulb size={30} className="text-yellow-500" />}
                    <GiComputerFan size={30} className={`${turnOnFan ? 'text-blue-500' : ''}`} />
                    <Notifications change={notifyActive}/>
                </div>
            </header>

            <Tabs defaultValue="main" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-8">
                    <TabsTrigger value="main" className="flex items-center gap-2">
                        <LayoutGrid className="h-4 w-4" />
                        <span className="hidden sm:inline">Panel Principal</span>
                    </TabsTrigger>
                    <TabsTrigger value="sensorsView" className="flex items-center gap-2">
                        <MdDeviceHub className="h-4 w-4" />
                        <span className="hidden sm:inline">Sensores</span>
                    </TabsTrigger>
                    <TabsTrigger value="reading" className="flex items-center gap-2">
                        <MdOutlineStackedLineChart className="h-4 w-4" />
                        <span className="hidden sm:inline">Lecturas</span>
                    </TabsTrigger>
                    <TabsTrigger value="alerts" className="flex items-center gap-2">
                        <Bell className="h-4 w-4" />
                        <span className="hidden sm:inline">Alertas</span>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="main" className="mt-0">
                    <Panel
                        sensors={sensors}
                        loading={loading}
                        setTurnOnLight={setTurnOnLight}
                        turnOLight={turnOLight} />
                </TabsContent>

                <TabsContent value="reading" className="mt-0">
                    <Readings />
                </TabsContent>

                <TabsContent value="sensorsView" className="mt-0">
                    <Sensors />
                </TabsContent>

                <TabsContent value="alerts" className="mt-0">
                    <AlertsPanel />
                </TabsContent>
            </Tabs>
        </div>
    )
}

