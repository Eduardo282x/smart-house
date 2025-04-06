import type * as React from "react"
import { BarChart3, Lightbulb, Thermometer, Lock, FileBarChart, CuboidIcon as Cube, Leaf, LogOut } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./components/ModeToggle"

type ActiveView = "dashboard" | "lighting" | "temperature" | "access" | "reports" | "3d"

interface AppShellProps {
    children: React.ReactNode
    activeView: ActiveView
    setActiveView: (view: ActiveView) => void
}

export const AppShell: React.FC<AppShellProps> = ({ children, activeView, setActiveView }) => {
    return (
        <SidebarProvider>
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
                                    <span className="text-xs text-muted-foreground">Energy Monitoring</span>
                                </div>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Monitoring</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton isActive={activeView === "dashboard"} onClick={() => setActiveView("dashboard")}>
                                        <BarChart3 className="text-green-600" />
                                        <span>Dashboard</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton isActive={activeView === "lighting"} onClick={() => setActiveView("lighting")}>
                                        <Lightbulb className="text-yellow-500" />
                                        <span>Lighting Control</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        isActive={activeView === "temperature"}
                                        onClick={() => setActiveView("temperature")}
                                    >
                                        <Thermometer className="text-orange-500" />
                                        <span>Temperature Control</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton isActive={activeView === "access"} onClick={() => setActiveView("access")}>
                                        <Lock className="text-blue-500" />
                                        <span>Access Control</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton isActive={activeView === "reports"} onClick={() => setActiveView("reports")}>
                                        <FileBarChart className="text-purple-500" />
                                        <span>Reports</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton isActive={activeView === "3d"} onClick={() => setActiveView("3d")}>
                                        <Cube className="text-cyan-500" />
                                        <span>3D View</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                    <div className="flex items-center justify-between p-4">
                        <Button variant="outline" size="icon">
                            <LogOut className="h-4 w-4" />
                            <span className="sr-only">Log out</span>
                        </Button>
                        <ModeToggle />
                    </div>
                </SidebarFooter>
            </Sidebar>
            <SidebarInset>
                <div className="flex h-full flex-col">
                    <header className="flex h-14 items-center gap-4 border-b bg-background px-6">
                        <SidebarTrigger />
                        <div className="font-semibold">
                            {activeView === "dashboard" && "Dashboard"}
                            {activeView === "lighting" && "Lighting Control"}
                            {activeView === "temperature" && "Temperature Control"}
                            {activeView === "access" && "Access Control"}
                            {activeView === "reports" && "Reports"}
                            {activeView === "3d" && "3D Building View"}
                        </div>
                    </header>
                    <main className="flex-1 overflow-auto p-6">{children}</main>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

