"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  MoreHorizontal,
  Shield,
  Edit,
  Trash2,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AddUserDialog } from "@/components/users/AddUserDialog";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { usersApi } from "@/lib/api/users";
import type { User } from "@/types/user";
import type { UserCreateFormData } from "@/lib/validations/user.schema";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
    limit: 20,
  });

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await usersApi.getAll(page, 20);

      if (response.success && response.data) {
        setUsers(response.data);
        setPagination(
          response.meta || {
            total: 0,
            totalPages: 0,
            limit: 20,
          },
        );
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch users");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
  );

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "admin":
        return "default";
      case "organizer":
        return "secondary";
      default:
        return "outline";
    }
  };

  const handleCreateUser = async (data: UserCreateFormData) => {
    console.log("data", data);
    setIsCreating(true);
    try {
      const response = await usersApi.create(data);
      await fetchUsers();
      return response;
    } catch (err: any) {
      toast.error(err.message || "Failed to create user");
      throw err;
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      const res: any = await usersApi.delete(userId);
      if (res.success) {
        toast.success(res.message || "User deleted successfully");
        await fetchUsers();
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to delete user");
    }
  };

  const handleToggleUserStatus = async (
    userId: string,
    currentStatus: string,
  ) => {
    const newStatus = currentStatus === "active" ? "suspended" : "active";
    try {
      await usersApi.updateStatus(userId, newStatus);
      toast.success(
        `User ${newStatus === "active" ? "activated" : "suspended"} successfully`,
      );
      await fetchUsers();
    } catch (err: any) {
      toast.error(err.message || "Failed to update user status");
    }
  };

  if (isLoading && users.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 sm:mb-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h1 className="text-xl sm:text-2xl font-bold">User Management</h1>

          <Breadcrumb
            items={[{ label: "Admin", href: "/admin" }, { label: "Users" }]}
          />
        </div>
      </motion.div>

      {error && (
        <Alert variant="destructive" className="mb-4 sm:mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader className="pb-4 sm:pb-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="flex-1 w-full sm:max-w-sm">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  className="pl-10 h-10 sm:h-auto"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <Button onClick={() => setIsAddDialogOpen(true)} className="w-full sm:w-auto">
              <UserPlus className="h-4 w-4 mr-1 sm:mr-2" />
              <span>Add User</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          {/* Mobile Card View */}
          <div className="md:hidden space-y-3 sm:space-y-4">
            {filteredUsers.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                    <Avatar className="h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0">
                      <AvatarFallback className="text-xs sm:text-sm">
                        {getInitials(user.firstName, user.lastName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm sm:text-base truncate">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground truncate">{user.email}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="flex-shrink-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="min-w-[160px]">
                      <DropdownMenuItem className="cursor-pointer">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit User
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() =>
                          handleToggleUserStatus(user.id, user.status)
                        }
                      >
                        <Shield className="h-4 w-4 mr-2" />
                        {user.status === "active" ? "Suspend" : "Activate"}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive cursor-pointer"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  <Badge variant={getRoleBadgeVariant(user.role)} className="text-xs">
                    {user.role}
                  </Badge>
                  <Badge
                    variant={
                      user.status === "active" ? "default" : "secondary"
                    }
                    className="text-xs"
                  >
                    {user.status}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {formatDate(new Date(user.createdAt))}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left pb-3 font-medium">Name</th>
                  <th className="text-left pb-3 font-medium">Email</th>
                  <th className="text-left pb-3 font-medium">Role</th>
                  <th className="text-left pb-3 font-medium">Status</th>
                  <th className="text-left pb-3 font-medium">Joined</th>
                  <th className="text-right pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b last:border-0 hover:bg-muted/50"
                  >
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {getInitials(user.firstName, user.lastName)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">
                          {user.firstName} {user.lastName}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 text-muted-foreground">{user.email}</td>
                    <td className="py-3">
                      <Badge variant={getRoleBadgeVariant(user.role)}>
                        {user.role}
                      </Badge>
                    </td>
                    <td className="py-3">
                      <Badge
                        variant={
                          user.status === "active" ? "default" : "secondary"
                        }
                      >
                        {user.status}
                      </Badge>
                    </td>
                    <td className="py-3 text-muted-foreground">
                      {formatDate(new Date(user.createdAt))}
                    </td>
                    <td className="py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="cursor-pointer">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() =>
                              handleToggleUserStatus(user.id, user.status)
                            }
                          >
                            <Shield className="h-4 w-4 mr-2" />
                            {user.status === "active" ? "Suspend" : "Activate"}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive cursor-pointer"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>

            {filteredUsers.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No users found
              </div>
            )}
          </div>

          {pagination.totalPages > 1 && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4 sm:mt-6 pt-4 border-t">
              <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
                Page {page} of {pagination.totalPages} ({pagination.total} users)
              </p>
              <div className="flex gap-2 justify-center sm:justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 sm:px-6"
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setPage((p) => Math.min(pagination.totalPages, p + 1))
                  }
                  disabled={page === pagination.totalPages}
                  className="px-4 sm:px-6"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add User Dialog */}
      <AddUserDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleCreateUser}
        isLoading={isCreating}
      />
    </div>
  );
}
