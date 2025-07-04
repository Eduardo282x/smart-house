"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import { Plus, Edit, Trash2, Building } from "lucide-react"

interface Area {
    id: string
    name: string
    description: string
    size: number
    capacity: number
    createdAt: string
}

export const Areas = () => {
    const [areas, setAreas] = useState<Area[]>([
        {
            id: "1",
            name: "Main Entrance",
            description: "Main entrance and reception area",
            size: 50,
            capacity: 20,
            createdAt: "2024-01-15",
        },
        {
            id: "2",
            name: "Classroom 1",
            description: "Primary classroom for mathematics and sciences",
            size: 80,
            capacity: 30,
            createdAt: "2024-01-15",
        },
        {
            id: "3",
            name: "Classroom 2",
            description: "Secondary classroom for languages and humanities",
            size: 75,
            capacity: 28,
            createdAt: "2024-01-15",
        },
        {
            id: "4",
            name: "Dining Area",
            description: "Student and staff dining area",
            size: 120,
            capacity: 50,
            createdAt: "2024-01-15",
        },
    ])

    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingArea, setEditingArea] = useState<Area | null>(null)
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        size: "",
        capacity: "",
    })

    const handleOpenDialog = (area?: Area) => {
        if (area) {
            setEditingArea(area)
            setFormData({
                name: area.name,
                description: area.description,
                size: area.size.toString(),
                capacity: area.capacity.toString(),
            })
        } else {
            setEditingArea(null)
            setFormData({
                name: "",
                description: "",
                size: "",
                capacity: "",
            })
        }
        setIsDialogOpen(true)
    }

    const handleSave = () => {
        if (editingArea) {
            // Edit existing area
            setAreas(
                areas.map((area) =>
                    area.id === editingArea.id
                        ? {
                            ...area,
                            name: formData.name,
                            description: formData.description,
                            size: Number.parseInt(formData.size),
                            capacity: Number.parseInt(formData.capacity),
                        }
                        : area,
                ),
            )
        } else {
            // Add new area
            const newArea: Area = {
                id: Date.now().toString(),
                name: formData.name,
                description: formData.description,
                size: Number.parseInt(formData.size),
                capacity: Number.parseInt(formData.capacity),
                createdAt: new Date().toISOString().split("T")[0],
            }
            setAreas([...areas, newArea])
        }
        setIsDialogOpen(false)
    }

    const handleDelete = (id: string) => {
        setAreas(areas.filter((area) => area.id !== id))
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">Areas Management</h2>
                    <p className="text-muted-foreground">Manage all areas in your educational institution</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => handleOpenDialog()} className="bg-green-600 hover:bg-green-700">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Area
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>{editingArea ? "Edit Area" : "Add New Area"}</DialogTitle>
                            <DialogDescription>
                                {editingArea ? "Update the area information." : "Create a new area for your institution."}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Area Name</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Enter area name"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Enter area description"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="size">Size (m²)</Label>
                                    <Input
                                        id="size"
                                        type="number"
                                        value={formData.size}
                                        onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                                        placeholder="0"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="capacity">Capacity</Label>
                                    <Input
                                        id="capacity"
                                        type="number"
                                        value={formData.capacity}
                                        onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                                        placeholder="0"
                                    />
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                                {editingArea ? "Update" : "Create"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <Building className="mr-2 h-5 w-5 text-green-600" />
                        Areas Overview
                    </CardTitle>
                    <CardDescription>Total areas: {areas.length}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Size (m²)</TableHead>
                                <TableHead>Capacity</TableHead>
                                <TableHead>Created</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {areas.map((area) => (
                                <TableRow key={area.id}>
                                    <TableCell className="font-medium">{area.name}</TableCell>
                                    <TableCell className="max-w-xs truncate">{area.description}</TableCell>
                                    <TableCell>{area.size}</TableCell>
                                    <TableCell>{area.capacity}</TableCell>
                                    <TableCell>{area.createdAt}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end space-x-2">
                                            <Button variant="outline" size="sm" onClick={() => handleOpenDialog(area)}>
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
                                                            This action cannot be undone. This will permanently delete the area "{area.name}".
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleDelete(area.id)}>Delete</AlertDialogAction>
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
