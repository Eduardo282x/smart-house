import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { CalendarIcon, FileBarChart } from "lucide-react"
import { format } from "date-fns"
import { FC } from "react"

interface GenerateReportProps {
    reportType: string;
    setReportType: (reportType: string) => void;
    reportPeriod: string;
    setReportPeriod: (reportPeriod: string) => void;
    date: Date | undefined;
    setDate: (date: Date | undefined) => void;
}

export const GenerateReport: FC<GenerateReportProps> = ({ reportType, setReportType, reportPeriod, setReportPeriod, date, setDate }) => {
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Generar Reporte</CardTitle>
                    <CardDescription>Crear un reporte personalizado del consumo de energía y temperatura.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Tipo de reporte</label>
                            <Select value={reportType} onValueChange={setReportType}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select report type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="energy">Consumo Energético</SelectItem>
                                    <SelectItem value="temperature">Temperatura</SelectItem>
                                    <SelectItem value="access">Control de Acceso</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Periodo</label>
                            <Select value={reportPeriod} onValueChange={setReportPeriod}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecciona el periodo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="daily">Diario</SelectItem>
                                    <SelectItem value="weekly">Semanal</SelectItem>
                                    <SelectItem value="monthly">Mensual</SelectItem>
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
                    <Button variant="outline">Reiniciar</Button>
                    <Button>
                        <FileBarChart className="mr-2 h-4 w-4" />
                        Generar Reporte
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
