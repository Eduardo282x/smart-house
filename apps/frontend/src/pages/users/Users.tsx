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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Plus, Edit, Trash2, Shield, GraduationCap } from "lucide-react"
import { Role } from "./user.data"
import { FaUserFriends } from "react-icons/fa"

interface User {
    id: string
    name: string
    email: string
    role: Role
    status: "active" | "inactive"
    lastLogin: string
    createdAt: string
}

export const Users = () => {
    const [users, setUsers] = useState<User[]>([
        {
            id: "1",
            name: "Maria Rodriguez",
            email: "maria.rodriguez@school.edu",
            role: "administrator",
            status: "active",
            lastLogin: "2024-01-20 09:15",
            createdAt: "2024-01-10",
        },
        {
            id: "2",
            name: "John Smith",
            email: "john.smith@school.edu",
            role: "teacher",
            status: "active",
            lastLogin: "2024-01-19 14:30",
            createdAt: "2024-01-12",
        },
        {
            id: "3",
            name: "Sarah Johnson",
            email: "sarah.johnson@school.edu",
            role: "teacher",
            status: "active",
            lastLogin: "2024-01-18 11:45",
            createdAt: "2024-01-15",
        },
        {
            id: "4",
            name: "David Lee",
            email: "david.lee@school.edu",
            role: "teacher",
            status: "inactive",
            lastLogin: "2024-01-10 16:20",
            createdAt: "2024-01-08",
        },
    ])

    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingUser, setEditingUser] = useState<User | null>(null)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "",
        status: "active",
    })

    const handleOpenDialog = (user?: User) => {
        if (user) {
            setEditingUser(user)
            setFormData({
                name: user.name,
                email: user.email,
                role: user.role,
                status: user.status,
            })
        } else {
            setEditingUser(null)
            setFormData({
                name: "",
                email: "",
                role: "",
                status: "active",
            })
        }
        setIsDialogOpen(true)
    }

    const handleSave = () => {
        if (editingUser) {
            // Edit existing user
            setUsers(
                users.map((user) =>
                    user.id === editingUser.id
                        ? {
                            ...user,
                            name: formData.name,
                            email: formData.email,
                            role: formData.role as User["role"],
                            status: formData.status as User["status"],
                        }
                        : user,
                ),
            )
        } else {
            // Add new user
            const newUser: User = {
                id: Date.now().toString(),
                name: formData.name,
                email: formData.email,
                role: formData.role as User["role"],
                status: formData.status as User["status"],
                lastLogin: "Never",
                createdAt: new Date().toISOString().split("T")[0],
            }
            setUsers([...users, newUser])
        }
        setIsDialogOpen(false)
    }

    const handleDelete = (id: string) => {
        setUsers(users.filter((user) => user.id !== id))
    }

    const getRoleIcon = (role: string) => {
        switch (role) {
            case "administrator":
                return <Shield className="h-4 w-4 text-red-500" />
            case "teacher":
                return <GraduationCap className="h-4 w-4 text-blue-500" />
            default:
                return <FaUserFriends className="h-4 w-4 text-gray-500" />
        }
    }

    const getRoleBadgeColor = (role: Role) => {
        switch (role) {
            case "administrator":
                return "destructive"
            case "teacher":
                return "default"
            default:
                return "secondary"
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">Users Management</h2>
                    <p className="text-muted-foreground">Manage system users and their access permissions</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => handleOpenDialog()} className="bg-green-600 hover:bg-green-700">
                            <Plus className="mr-2 h-4 w-4" />
                            Add User
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>{editingUser ? "Edit User" : "Add New User"}</DialogTitle>
                            <DialogDescription>
                                {editingUser ? "Update the user information." : "Create a new user account for the system."}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Enter full name"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="Enter email address"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="role">Role</Label>
                                <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select user role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="administrator">Administrator</SelectItem>
                                        <SelectItem value="teacher">Teacher</SelectItem>
                                    </SelectContent>
                                </Select>
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
                                {editingUser ? "Update" : "Create"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                        <FaUserFriends className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{users.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                        <FaUserFriends className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{users.filter((u) => u.status === "active").length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Administrators</CardTitle>
                        <Shield className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{users.filter((u) => u.role === "administrator").length}</div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <FaUserFriends className="mr-2 h-5 w-5 text-green-600" />
                        Users Overview
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Last Login</TableHead>
                                <TableHead>Created</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center space-x-3">
                                            <Avatar>
                                                <AvatarFallback>
                                                    {user.name
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span>{user.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-2">
                                            {getRoleIcon(user.role)}
                                            <Badge variant={getRoleBadgeColor(user.role)} className="capitalize">
                                                {user.role}
                                            </Badge>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={user.status === "active" ? "default" : "secondary"}>{user.status}</Badge>
                                    </TableCell>
                                    <TableCell className="text-sm">{user.lastLogin}</TableCell>
                                    <TableCell>{user.createdAt}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end space-x-2">
                                            <Button variant="outline" size="sm" onClick={() => handleOpenDialog(user)}>
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
                                                            This action cannot be undone. This will permanently delete the user account for "
                                                            {user.name}".
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleDelete(user.id)}>Delete</AlertDialogAction>
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
