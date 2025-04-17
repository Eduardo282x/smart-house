import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/layout/AppSidebar'
import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router'

export const Layout = () => {
    const location = useLocation();
    const [bgColor, setBgColor] = useState<string>('');

    useEffect(() => {
        if(location.pathname === '/') setBgColor('bg-green-600')
        if(location.pathname === '/luces') setBgColor('bg-yellow-500')
        if(location.pathname === '/temperatura') setBgColor('bg-orange-500')
        if(location.pathname === '/acceso') setBgColor('bg-blue-500')
        if(location.pathname === '/reportes') setBgColor('bg-purple-500')
    }, [location.pathname])

    return (
        <div className='w-full h-full'>
            <SidebarProvider>
                <AppSidebar></AppSidebar>
                <div className={`w-full h-full min-h-screen p-4 ${bgColor}`}>
                    {/* <div className='flex items-center justify-start px-4 h-10'>
                        <SidebarTrigger/>
                    </div> */}
                    <Outlet></Outlet>
                </div>
            </SidebarProvider>
        </div>
    )
}
