import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Download, FileBarChart } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { AreaConsumptionChart } from "../dashboard/components/area-consumption"
import { EnergyConsumptionChart } from "../energy/Energy"

export function ReportsModule() {
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [reportType, setReportType] = useState("energy")
    const [reportPeriod, setReportPeriod] = useState("daily")

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Reports</h2>

            <Card>
                <CardHeader>
                    <CardTitle>Generate Report</CardTitle>
                    <CardDescription>Create custom reports for energy consumption and temperature data.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Report Type</label>
                            <Select value={reportType} onValueChange={setReportType}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select report type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="energy">Energy Consumption</SelectItem>
                                    <SelectItem value="temperature">Temperature</SelectItem>
                                    <SelectItem value="access">Access Control</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Period</label>
                            <Select value={reportPeriod} onValueChange={setReportPeriod}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select period" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="daily">Daily</SelectItem>
                                    <SelectItem value="weekly">Weekly</SelectItem>
                                    <SelectItem value="monthly">Monthly</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Date</label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline">Reset</Button>
                    <Button>
                        <FileBarChart className="mr-2 h-4 w-4" />
                        Generate Report
                    </Button>
                </CardFooter>
            </Card>

            <Tabs defaultValue="preview">
                <TabsList className="mb-4">
                    <TabsTrigger value="preview">Report Preview</TabsTrigger>
                    <TabsTrigger value="export">Export Options</TabsTrigger>
                </TabsList>

                <TabsContent value="preview">
                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle>
                                    {reportType === "energy" && "Energy Consumption Report"}
                                    {reportType === "temperature" && "Temperature Report"}
                                    {reportType === "access" && "Access Control Report"}
                                </CardTitle>
                                <Button variant="outline" size="sm">
                                    <Download className="mr-2 h-4 w-4" />
                                    Export
                                </Button>
                            </div>
                            <CardDescription>
                                {reportPeriod === "daily" && "Daily report for " + (date ? format(date, "PPP") : "today")}
                                {reportPeriod === "weekly" &&
                                    "Weekly report for the week of " + (date ? format(date, "PPP") : "this week")}
                                {reportPeriod === "monthly" &&
                                    "Monthly report for " + (date ? format(date, "MMMM yyyy") : "this month")}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-8">
                                <div className="h-[300px]">
                                    {reportType === "energy" && <EnergyConsumptionChart />}
                                    {reportType === "temperature" && <AreaConsumptionChart />}
                                    {reportType === "access" && (
                                        <div className="flex items-center justify-center h-full text-muted-foreground">
                                            Access report visualization
                                        </div>
                                    )}
                                </div>

                                <div className="border rounded-lg p-4">
                                    <h3 className="font-medium mb-2">Summary</h3>
                                    <ul className="space-y-1 text-sm">
                                        <li>Total consumption: 142.8 kWh</li>
                                        <li>Peak usage time: 14:00 (140 kWh)</li>
                                        <li>Lowest usage time: 04:00 (20 kWh)</li>
                                        <li>Average temperature: 22.5°C</li>
                                        <li>Total entries: 5</li>
                                        <li>Total exits: 5</li>
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="export">
                    <Card>
                        <CardHeader>
                            <CardTitle>Export Options</CardTitle>
                            <CardDescription>Choose a format to export your report.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-3">
                                <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                                    <FileBarChart className="h-8 w-8 mb-2" />
                                    PDF Report
                                </Button>
                                <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                                    <FileBarChart className="h-8 w-8 mb-2" />
                                    CSV Data
                                </Button>
                                <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                                    <FileBarChart className="h-8 w-8 mb-2" />
                                    Excel Spreadsheet
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

