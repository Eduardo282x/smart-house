import { Leaf, LogOut } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { IMenu, menu } from "./menu.data"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from 'react-router';

export const AppSidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    // const [bgColor, setBgColor] = useState<string>('');
    const [menuSidebar, setMenuSidebar] = useState<IMenu[]>(menu);

    useEffect(() => {
        setMenuSidebar((prev) => (
            prev.map(me => {
                return {
                    ...me,
                    active: me.url === location.pathname
                }
            })
        ))

        // if (location.pathname === '/') setBgColor('bg-green-400')
        // if (location.pathname === '/luces') setBgColor('bg-yellow-300')
        // if (location.pathname === '/temperatura') setBgColor('bg-orange-300')
        // if (location.pathname === '/acceso') setBgColor('bg-blue-300')
        // if (location.pathname === '/reportes') setBgColor('bg-purple-300')
    }, [location.pathname])

    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg">
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-green-600 text-white">
                                <Leaf className="size-4" />
                            </div>
                            <div className="flex flex-col gap-0.5 leading-none">
                                <span className="font-semibold">OPTIDOMO</span>
                                <span className="text-xs text-muted-foreground">Monitoreo de Energía</span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuSidebar && menuSidebar.map((me: IMenu, index: number) => (
                                <SidebarMenuItem key={index}>
                                    <SidebarMenuButton onClick={() => navigate(me.url)} className={`font-medium text-md hover:text-${me.className} ${me.active ? `bg-${me.className} hover:text-white hover:bg-${me.className} text-white` : `text-${me.className}`}`}>
                                        <me.icon />
                                        <span>{me.label}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <div className="flex items-center justify-between p-4">
                    <Button variant="outline" className="w-full">
                        <span>Cerrar Sesión</span>
                        <LogOut className="h-4 w-4" />
                    </Button>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}

