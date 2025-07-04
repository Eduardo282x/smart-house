"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Lightbulb, Thermometer, Zap } from "lucide-react"
import { FaPlug } from "react-icons/fa"

interface Device {
    id: string
    name: string
    type: "light" | "air_conditioner" | "other"
    subtype: string
    consumption: number
    status: "active" | "inactive"
    createdAt: string
}

export const Devices = () => {
    const [devices, setDevices] = useState<Device[]>([
        {
            id: "1",
            name: "Luz principal",
            type: "light",
            subtype: "LED",
            consumption: 12,
            status: "active",
            createdAt: "2024-01-15",
        },
        {
            id: "2",
            name: "Luz secundaria",
            type: "light",
            subtype: "LED",
            consumption: 12,
            status: "active",
            createdAt: "2024-01-15",
        },
        {
            id: "3",
            name: "Aire Split 12BTU",
            type: "air_conditioner",
            subtype: "Split",
            consumption: 150,
            status: "active",
            createdAt: "2024-01-15",
        },
        {
            id: "4",
            name: "Aire Split 24BTU",
            type: "light",
            subtype: "Fluorescent",
            consumption: 18,
            status: "active",
            createdAt: "2024-01-15",
        },
        {
            id: "5",
            name: "Aire 3T",
            type: "air_conditioner",
            subtype: "Central",
            consumption: 200,
            status: "inactive",
            createdAt: "2024-01-15",
        },
    ])

    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingDevice, setEditingDevice] = useState<Device | null>(null)
    const [formData, setFormData] = useState({
        name: "",
        type: "",
        subtype: "",
        consumption: "",
        status: "active",
    })

    const deviceTypes = [
        { value: "light", label: "Light", subtypes: ["LED", "Fluorescent", "Halogen", "Incandescent"] },
        { value: "air_conditioner", label: "Air Conditioner", subtypes: ["Split", "Central", "Window", "Portable"] },
        { value: "other", label: "Other", subtypes: ["Fan", "Projector", "Computer", "Monitor"] },
    ]

    const handleOpenDialog = (device?: Device) => {
        if (device) {
            setEditingDevice(device)
            setFormData({
                name: device.name,
                type: device.type,
                subtype: device.subtype,
                consumption: device.consumption.toString(),
                status: device.status,
            })
        } else {
            setEditingDevice(null)
            setFormData({
                name: "",
                type: "",
                subtype: "",
                consumption: "",
                status: "active",
            })
        }
        setIsDialogOpen(true)
    }

    const handleSave = () => {
        if (editingDevice) {
            // Edit existing device
            setDevices(
                devices.map((device) =>
                    device.id === editingDevice.id
                        ? {
                            ...device,
                            name: formData.name,
                            type: formData.type as Device["type"],
                            subtype: formData.subtype,
                            consumption: Number.parseInt(formData.consumption),
                            status: formData.status as Device["status"],
                        }
                        : device,
                ),
            )
        } else {
            // Add new device
            const newDevice: Device = {
                id: Date.now().toString(),
                name: formData.name,
                type: formData.type as Device["type"],
                subtype: formData.subtype,
                consumption: Number.parseInt(formData.consumption),
                status: formData.status as Device["status"],
                createdAt: new Date().toISOString().split("T")[0],
            }
            setDevices([...devices, newDevice])
        }
        setIsDialogOpen(false)
    }

    const handleDelete = (id: string) => {
        setDevices(devices.filter((device) => device.id !== id))
    }

    const getDeviceIcon = (type: string) => {
        switch (type) {
            case "light":
                return <Lightbulb className="h-4 w-4 text-yellow-500" />
            case "air_conditioner":
                return <Thermometer className="h-4 w-4 text-blue-500" />
            default:
                return <Zap className="h-4 w-4 text-gray-500" />
        }
    }

    const selectedDeviceType = deviceTypes.find((dt) => dt.value === formData.type)

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">Control de dispositivos</h2>
                    <p className="text-muted-foreground">Administra todos los dispositivos de tu institución educativa. </p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => handleOpenDialog()} className="bg-green-600 hover:bg-green-700">
                            <Plus className="mr-2 h-4 w-4" />
                            Agregar Dispositivo
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>{editingDevice ? "Edit Device" : "Add New Device"}</DialogTitle>
                            <DialogDescription>
                                {editingDevice ? "Update the device information." : "Create a new device for your institution."}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Device Name</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Enter device name"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="type">Device Type</Label>
                                <Select
                                    value={formData.type}
                                    onValueChange={(value) => setFormData({ ...formData, type: value, subtype: "" })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select device type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {deviceTypes.map((type) => (
                                            <SelectItem key={type.value} value={type.value}>
                                                {type.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            {selectedDeviceType && (
                                <div className="grid gap-2">
                                    <Label htmlFor="subtype">Device Subtype</Label>
                                    <Select
                                        value={formData.subtype}
                                        onValueChange={(value) => setFormData({ ...formData, subtype: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select device subtype" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {selectedDeviceType.subtypes.map((subtype) => (
                                                <SelectItem key={subtype} value={subtype}>
                                                    {subtype}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                            <div className="grid gap-2">
                                <Label htmlFor="consumption">Power Consumption (W/h)</Label>
                                <Input
                                    id="consumption"
                                    type="number"
                                    value={formData.consumption}
                                    onChange={(e) => setFormData({ ...formData, consumption: e.target.value })}
                                    placeholder="0"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="status">Status</Label>
                                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                                {editingDevice ? "Update" : "Create"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Dispositivos</CardTitle>
                        <Zap className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{devices.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Dispositivos Activos</CardTitle>
                        <Zap className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{devices.filter((d) => d.status === "active").length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Consumo total</CardTitle>
                        <Zap className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {devices.filter((d) => d.status === "active").reduce((sum, d) => sum + d.consumption, 0)} W/h
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <FaPlug className="mr-2 h-5 w-5 text-green-600" />
                        Dispositivos
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Dispositivo</TableHead>
                                <TableHead>Tipo</TableHead>
                                {/* <TableHead>Subtype</TableHead> */}
                                <TableHead>Consumo</TableHead>
                                <TableHead>Estado</TableHead>
                                {/* <TableHead>Creado</TableHead> */}
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {devices.map((device) => (
                                <TableRow key={device.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center space-x-2">
                                            {getDeviceIcon(device.type)}
                                            <span>{device.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="capitalize">{device.type == 'air_conditioner' ? 'Aire Acondicionado' : 'Luz'}</TableCell>
                                    {/* <TableCell>{device.subtype}</TableCell> */}
                                    <TableCell>{device.consumption} W/h</TableCell>
                                    <TableCell>
                                        <Badge variant={device.status === "active" ? "default" : "secondary"}>{device.status == 'active' ? 'Activo' : 'Inavtivo'}</Badge>
                                    </TableCell>
                                    {/* <TableCell>{device.createdAt}</TableCell> */}
                                    <TableCell className="text-right">
                                        <div className="flex justify-end space-x-2">
                                            <Button variant="outline" size="sm" onClick={() => handleOpenDialog(device)}>
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="outline" size="sm">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action cannot be undone. This will permanently delete the device "{device.name}".
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleDelete(device.id)}>Delete</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
