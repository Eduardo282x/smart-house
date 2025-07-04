import { Button } from "@/components/ui/button"
import { Wifi, WifiOff, RefreshCw } from "lucide-react"
import { FC } from "react"

interface ConnectionStatusProps {
    isConnected: boolean
    onReconnect: () => void
}

export const ConnectionStatus: FC<ConnectionStatusProps> = ({ isConnected, onReconnect }) => {
    return (
        <div className="flex items-center gap-3 bg-gray-200 dark:bg-gray-800 px-4 py-2 rounded-full">
            {isConnected ? (
                <>
                    <Wifi className="h-5 w-5 text-green-500" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Conectado</span>
                </>
            ) : (
                <>
                    <WifiOff className="h-5 w-5 text-red-500" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Desconectado</span>
                </>
            )}
            <Button variant="ghost" size="sm" onClick={onReconnect} className="ml-2 h-8 px-2">
                <RefreshCw className="h-4 w-4" />
                <span className="sr-only">Reconectar</span>
            </Button>
        </div>
    )
}

