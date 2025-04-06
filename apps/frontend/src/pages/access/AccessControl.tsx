import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { LogIn, LogOut } from "lucide-react"

interface AccessEvent {
    id: string
    name: string
    role: string
    area: string
    type: "entry" | "exit"
    time: string
}

export function AccessControl() {
    const accessEvents: AccessEvent[] = [
        { id: "1", name: "Maria Rodriguez", role: "Teacher", area: "Entrance", type: "entry", time: "08:15 AM" },
        { id: "2", name: "John Smith", role: "Student", area: "Entrance", type: "entry", time: "08:20 AM" },
        { id: "3", name: "Sarah Johnson", role: "Student", area: "Classroom 1", type: "entry", time: "08:25 AM" },
        { id: "4", name: "David Lee", role: "Student", area: "Classroom 2", type: "entry", time: "08:30 AM" },
        { id: "5", name: "Emma Wilson", role: "Student", area: "Dining Area", type: "entry", time: "12:00 PM" },
        { id: "6", name: "Emma Wilson", role: "Student", area: "Dining Area", type: "exit", time: "12:45 PM" },
        { id: "7", name: "Sarah Johnson", role: "Student", area: "Classroom 1", type: "exit", time: "02:30 PM" },
        { id: "8", name: "David Lee", role: "Student", area: "Classroom 2", type: "exit", time: "03:00 PM" },
        { id: "9", name: "John Smith", role: "Student", area: "Entrance", type: "exit", time: "03:15 PM" },
        { id: "10", name: "Maria Rodriguez", role: "Teacher", area: "Entrance", type: "exit", time: "04:00 PM" },
    ]

    const areas = ["All Areas", "Entrance", "Classroom 1", "Classroom 2", "Dining Area"]

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Access Control</h2>

            <Tabs defaultValue="All Areas">
                <TabsList className="mb-4">
                    {areas.map((area) => (
                        <TabsTrigger key={area} value={area}>
                            {area}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {areas.map((area) => (
                    <TabsContent key={area} value={area}>
                        <Card>
                            <CardHeader>
                                <CardTitle>{area === "All Areas" ? "All Access Events" : `${area} Access Events`}</CardTitle>
                                <CardDescription>
                                    Real-time log of entries and exits {area !== "All Areas" ? `in the ${area.toLowerCase()}` : ""}.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {accessEvents
                                        .filter((event) => area === "All Areas" || event.area === area)
                                        .map((event) => (
                                            <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                                                <div className="flex items-center space-x-4">
                                                    <Avatar>
                                                        <AvatarFallback>
                                                            {event.name
                                                                .split(" ")
                                                                .map((n) => n[0])
                                                                .join("")}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-medium">{event.name}</p>
                                                        <p className="text-sm text-muted-foreground">{event.role}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-4">
                                                    <div className="text-right">
                                                        <p className="text-sm">{event.area}</p>
                                                        <p className="text-sm text-muted-foreground">{event.time}</p>
                                                    </div>
                                                    <Badge
                                                        variant={event.type === "entry" ? "default" : "secondary"}
                                                        className="flex items-center space-x-1"
                                                    >
                                                        {event.type === "entry" ? (
                                                            <>
                                                                <LogIn className="h-3 w-3" /> <span>Entry</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <LogOut className="h-3 w-3" /> <span>Exit</span>
                                                            </>
                                                        )}
                                                    </Badge>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}

