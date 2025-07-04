"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
import { IoSettingsOutline } from "react-icons/io5"

interface DeviceAssignment {
    id: string
    areaId: string
    areaName: string
    deviceId: string
    deviceName: string
    deviceType: string
    deviceSubtype: string
    consumption: number
    assignedAt: string
}

export const Settings = () => {
    const [assignments, setAssignments] = useState<DeviceAssignment[]>([
        {
            id: "1",
            areaId: "1",
            areaName: "Main Entrance",
            deviceId: "1",
            deviceName: "Main Entrance Light 1",
            deviceType: "light",
            deviceSubtype: "LED",
            consumption: 12,
            assignedAt: "2024-01-15",
        },
        {
            id: "2",
            areaId: "1",
            areaName: "Main Entrance",
            deviceId: "2",
            deviceName: "Main Entrance Light 2",
            deviceType: "light",
            deviceSubtype: "LED",
            consumption: 12,
            assignedAt: "2024-01-15",
        },
        {
            id: "3",
            areaId: "2",
            areaName: "Classroom 1",
            deviceId: "3",
            deviceName: "Classroom 1 AC",
            deviceType: "air_conditioner",
            deviceSubtype: "Split",
            consumption: 150,
            assignedAt: "2024-01-15",
        },
        {
            id: "4",
            areaId: "2",
            areaName: "Classroom 1",
            deviceId: "4",
            deviceName: "Classroom 1 Light 1",
            deviceType: "light",
            deviceSubtype: "Fluorescent",
            consumption: 18,
            assignedAt: "2024-01-15",
        },
    ])

    // Mock data for areas and devices
    const areas = [
        { id: "1", name: "Main Entrance" },
        { id: "2", name: "Classroom 1" },
        { id: "3", name: "Classroom 2" },
        { id: "4", name: "Dining Area" },
    ]

    const devices = [
        { id: "1", name: "Main Entrance Light 1", type: "light", subtype: "LED", consumption: 12 },
        { id: "2", name: "Main Entrance Light 2", type: "light", subtype: "LED", consumption: 12 },
        { id: "3", name: "Classroom 1 AC", type: "air_conditioner", subtype: "Split", consumption: 150 },
        { id: "4", name: "Classroom 1 Light 1", type: "light", subtype: "Fluorescent", consumption: 18 },
        { id: "5", name: "Dining Area AC", type: "air_conditioner", subtype: "Central", consumption: 200 },
    ]

    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingAssignment, setEditingAssignment] = useState<DeviceAssignment | null>(null)
    const [formData, setFormData] = useState({
        areaId: "",
        deviceId: "",
    })

    const handleOpenDialog = (assignment?: DeviceAssignment) => {
        if (assignment) {
            setEditingAssignment(assignment)
            setFormData({
                areaId: assignment.areaId,
                deviceId: assignment.deviceId,
            })
        } else {
            setEditingAssignment(null)
            setFormData({
                areaId: "",
                deviceId: "",
            })
        }
        setIsDialogOpen(true)
    }

    const handleSave = () => {
        const selectedArea = areas.find((a) => a.id === formData.areaId)
        const selectedDevice = devices.find((d) => d.id === formData.deviceId)

        if (!selectedArea || !selectedDevice) return

        if (editingAssignment) {
            // Edit existing assignment
            setAssignments(
                assignments.map((assignment) =>
                    assignment.id === editingAssignment.id
                        ? {
                            ...assignment,
                            areaId: formData.areaId,
                            areaName: selectedArea.name,
                            deviceId: formData.deviceId,
                            deviceName: selectedDevice.name,
                            deviceType: selectedDevice.type,
                            deviceSubtype: selectedDevice.subtype,
                            consumption: selectedDevice.consumption,
                        }
                        : assignment,
                ),
            )
        } else {
            // Add new assignment
            const newAssignment: DeviceAssignment = {
                id: Date.now().toString(),
                areaId: formData.areaId,
                areaName: selectedArea.name,
                deviceId: formData.deviceId,
                deviceName: selectedDevice.name,
                deviceType: selectedDevice.type,
                deviceSubtype: selectedDevice.subtype,
                consumption: selectedDevice.consumption,
                assignedAt: new Date().toISOString().split("T")[0],
            }
            setAssignments([...assignments, newAssignment])
        }
        setIsDialogOpen(false)
    }

    const handleDelete = (id: string) => {
        setAssignments(assignments.filter((assignment) => assignment.id !== id))
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

    const getAreaStats = () => {
        const stats = areas.map((area) => {
            const areaAssignments = assignments.filter((a) => a.areaId === area.id)
            const totalConsumption = areaAssignments.reduce((sum, a) => sum + a.consumption, 0)
            return {
                ...area,
                deviceCount: areaAssignments.length,
                totalConsumption,
            }
        })
        return stats
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">Configuration Management</h2>
                    <p className="text-muted-foreground">Assign devices to areas and manage configurations</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => handleOpenDialog()} className="bg-green-600 hover:bg-green-700">
                            <Plus className="mr-2 h-4 w-4" />
                            Assign Device
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>{editingAssignment ? "Edit Assignment" : "Assign Device to Area"}</DialogTitle>
                            <DialogDescription>
                                {editingAssignment ? "Update the device assignment." : "Assign a device to a specific area."}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="area">Area</Label>
                                <Select value={formData.areaId} onValueChange={(value) => setFormData({ ...formData, areaId: value })}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select an area" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {areas.map((area) => (
                                            <SelectItem key={area.id} value={area.id}>
                                                {area.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="device">Device</Label>
                                <Select
                                    value={formData.deviceId}
                                    onValueChange={(value) => setFormData({ ...formData, deviceId: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a device" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {devices.map((device) => (
                                            <SelectItem key={device.id} value={device.id}>
                                                <div className="flex items-center space-x-2">
                                                    {getDeviceIcon(device.type)}
                                                    <span>{device.name}</span>
                                                    <Badge variant="outline" className="ml-auto">
                                                        {device.consumption}W
                                                    </Badge>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                                {editingAssignment ? "Update" : "Assign"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                {getAreaStats().map((area) => (
                    <Card key={area.id}>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">{area.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{area.deviceCount}</div>
                            <p className="text-xs text-muted-foreground">devices</p>
                            <div className="text-sm font-medium text-green-600 mt-1">{area.totalConsumption} W/h</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <IoSettingsOutline className="mr-2 h-5 w-5 text-green-600" />
                        Device Assignments
                    </CardTitle>
                    <CardDescription>Current device assignments by area</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Area</TableHead>
                                <TableHead>Device</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Subtype</TableHead>
                                <TableHead>Consumption</TableHead>
                                <TableHead>Assigned</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {assignments.map((assignment) => (
                                <TableRow key={assignment.id}>
                                    <TableCell className="font-medium">{assignment.areaName}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-2">
                                            {getDeviceIcon(assignment.deviceType)}
                                            <span>{assignment.deviceName}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="capitalize">{assignment.deviceType.replace("_", " ")}</TableCell>
                                    <TableCell>{assignment.deviceSubtype}</TableCell>
                                    <TableCell>{assignment.consumption} W/h</TableCell>
                                    <TableCell>{assignment.assignedAt}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end space-x-2">
                                            <Button variant="outline" size="sm" onClick={() => handleOpenDialog(assignment)}>
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
                                                            This action cannot be undone. This will remove the device "{assignment.deviceName}" from "
                                                            {assignment.areaName}".
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleDelete(assignment.id)}>Remove</AlertDialogAction>
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
