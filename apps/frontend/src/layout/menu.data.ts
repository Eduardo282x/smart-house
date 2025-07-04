import { Lightbulb, Thermometer, Lock, FileBarChart } from 'lucide-react';
import { FaUserFriends, FaHome, FaPlug } from 'react-icons/fa';
import { MdOutlineMeetingRoom } from 'react-icons/md';
import { IoSettingsOutline } from 'react-icons/io5';


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
        icon: FaHome,
        url: '/',
        active: false,
        className: 'green-600',
    },
    {
        label: 'Luces',
        icon: Lightbulb,
        url: '/luces',
        active: false,
        className: 'yellow-500',
    },
    {
        label: 'Temperatura',
        icon: Thermometer,
        url: '/temperatura',
        active: false,
        className: 'orange-500',
    },
    {
        label: 'Acceso',
        icon: Lock,
        url: '/acceso',
        active: false,
        className: 'sky-500',
    },
    {
        label: 'Áreas',
        icon: MdOutlineMeetingRoom,
        url: '/areas',
        active: false,
        className: 'emerald-500',
    },
    {
        label: 'Dispositivos',
        icon: FaPlug,
        url: '/dispositivos',
        active: false,
        className: 'indigo-500',
    },
    {
        label: 'Configuración',
        icon: IoSettingsOutline,
        url: '/configuracion',
        active: false,
        className: 'gray-500',
    },
    {
        label: 'Usuarios',
        icon: FaUserFriends,
        url: '/usuarios',
        active: false,
        className: 'purple-500',
    },
    {
        label: 'Reportes',
        icon: FileBarChart,
        url: '/reportes',
        active: false,
        className: 'fuchsia-600',
    },
];