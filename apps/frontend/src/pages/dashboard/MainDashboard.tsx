import { useState } from "react"
import { TemperatureControl } from "../temperature/Temperature"
import { LightingControl } from "../lighting/Lighting"
import { DashboardView } from "./Dashboard"
import { AppShell } from "../shell/AppShell"
import { AccessControl } from "../access/AccessControl"
import { ReportsModule } from "../report/Report"

type ActiveView = "dashboard" | "lighting" | "temperature" | "access" | "reports" | "3d"

export function MainDashboard() {
    const [activeView, setActiveView] = useState<ActiveView>("dashboard")

    return (
        <AppShell activeView={activeView} setActiveView={setActiveView}>
            {activeView === "dashboard" && <DashboardView />}
            {activeView === "lighting" && <LightingControl />}
            {activeView === "temperature" && <TemperatureControl />}
            {activeView === "access" && <AccessControl />}
            {activeView === "reports" && <ReportsModule />}
            {/* {activeView === "3d" && <Building3D />} */}
        </AppShell>
    )
}

