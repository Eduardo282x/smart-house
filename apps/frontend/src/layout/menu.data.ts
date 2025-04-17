import { BarChart3, Lightbulb, Thermometer, Lock, FileBarChart } from "lucide-react"

export interface IMenu {
    label: string;
    icon: React.ComponentType<{ className?: string }>
    url: string;
    className?: string;
    active: boolean;
}

export const menu: IMenu[] = [
    {
        label: 'Inicio',
        icon: BarChart3,
        url: '/',
        active: false,
        className: 'green-600'
    },
    {
        label: 'Luces',
        icon: Lightbulb,
        url: '/luces',
        active: false,
        className: 'yellow-500'
    },
    {
        label: 'Temperatura',
        icon: Thermometer,
        url: '/temperatura',
        active: false,
        className: 'orange-500'
    },
    {
        label: 'Acceso',
        icon: Lock,
        url: '/acceso',
        active: false,
        className: 'blue-500'
    },
    {
        label: 'Reportes',
        icon: FileBarChart,
        url: '/reportes',
        active: false,
        className: 'purple-500'
    },

]