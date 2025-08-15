import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bell, BellRing, AlertTriangle, Thermometer, Droplets, Eye } from "lucide-react"
import { clearNotification, getAllNotifications, markAllSend, markSend } from "@/service/notifications/notifications.service"
import { timeAgo } from "@/lib/formatters"
import { Reading } from "@/service/readings/reading.interface"
import { IAlert } from "../alertPanel/AlertPanel"

interface INotification {
    id: number;
    alertTriggerId: number;
    alertTrigger: AlertTrigger;
    read: boolean;
    createdAt: Date
}

export interface AlertTrigger {
    id: number;
    alertId: number;
    readingId: number;
    triggeredAt: Date;
    alert: IAlert;
    reading: Reading;
}

interface NotificationsProps {
    change: number
}

export const Notifications = ({ change }: NotificationsProps) => {
    const [notifications, setNotifications] = useState<INotification[]>([])
    const [countNotifications, setCountNotifications] = useState<number>(0);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        getNotificationApi()
    }, [change]);

    const getNotificationApi = async () => {
        const response: INotification[] = await getAllNotifications();
        setNotifications(response);
    }

    useEffect(() => {
        setCountNotifications(notifications.filter(item => item.read == false).length)
    }, [notifications])

    const sensorName = (notification: INotification): string => {
        return notification.alertTrigger.alert.sensor.name;
    }

    const alertName = (notification: INotification): string => {
        return notification.alertTrigger.alert.name;
    }
    const alertValue = (notification: INotification): string => {
        return `${notification.alertTrigger.reading.value} ${notification.alertTrigger.reading.unit}`;
    }

    const getSensorIcon = (type: INotification) => {
        const sensorType = type.alertTrigger.alert.sensor.type;
        switch (sensorType) {
            case "Temperatura":
                return <Thermometer className="h-4 w-4" />
            case "humidity":
                return <Droplets className="h-4 w-4" />
            case "Proximidad":
                return <Eye className="h-4 w-4" />
            default:
                return <AlertTriangle className="h-4 w-4" />
        }
    }

    const markAllAsRead = async () => {
        setNotifications(prev => prev.map(item => ({
            ...item,
            read: true
        })));
        await markAllSend();
    }
    const markAsRead = async (notificationId: number) => {
        const findNotification = notifications.find(item => item.id == notificationId);
        if (findNotification && findNotification.read) return;

        setNotifications(prev => prev.map(item => ({
            ...item,
            read: item.id == notificationId ? true : item.read
        })));
        await markSend(notificationId);
    }
    const clearNotifications = async () => {
        console.log('Limpiadas');
        setNotifications([])
        await clearNotification();
    }

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                    {countNotifications > 0 ? <BellRing className="h-5 w-5" /> : <Bell className="h-5 w-5" />}
                    {countNotifications > 0 && (
                        <Badge
                            variant="destructive"
                            className="absolute -top-3 -right-3 h-5 w-5 flex items-center justify-center p-0 text-xs"
                        >
                            {countNotifications > 9 ? "9+" : countNotifications}
                        </Badge>
                    )}
                    <span className="sr-only">Notificaciones</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center justify-between">
                    <span>Notificaciones</span>
                    {countNotifications > 0 && (
                        <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-6 text-xs">
                            Marcar todas como leídas
                        </Button>
                    )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                {notifications.length === 0 ? (
                    <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">No hay notificaciones</div>
                ) : (
                    <ScrollArea className="h-80">
                        {notifications.map((notification) => (
                            <DropdownMenuItem
                                key={notification.id}
                                className="flex flex-col items-start p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                                onClick={() => markAsRead(notification.id)}
                            >
                                <div className="flex items-start justify-between w-full">
                                    <div className="flex items-start gap-3 flex-1">
                                        <div className={`mt-1`}>
                                            {getSensorIcon(notification)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <p className={`text-sm font-medium ${!notification.read ? "font-semibold" : ""}`}>
                                                    {alertName(notification)}
                                                </p>
                                                {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />}
                                            </div>
                                            {/* <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{notification.message}</p> */}
                                            <div className="">
                                                <div className="mb-2">
                                                    <Badge variant="outline" className="text-xs">
                                                        {sensorName(notification)}
                                                    </Badge>
                                                </div>
                                                <div className="flex items-end justify-between">
                                                    <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                                        Valor: {alertValue(notification)}
                                                    </p>

                                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                                        {timeAgo(notification.createdAt)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </DropdownMenuItem>
                        ))}
                    </ScrollArea>
                )}

                {notifications.length > 0 && (
                    <>
                        <DropdownMenuSeparator />
                        <div className="">
                            <Button variant="ghost" size="sm" className="w-full h-full p-2" onClick={clearNotifications}>
                                Limpiar todas las notificaciones
                            </Button>
                        </div>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
