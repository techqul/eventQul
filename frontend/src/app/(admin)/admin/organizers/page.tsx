"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  MoreHorizontal,
  Shield,
  Edit,
  Trash2,
  Building2,
  ExternalLink,
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
import { AddOrganizerDialog } from "@/components/organizers/AddOrganizerDialog";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { organizersApi } from "@/lib/api/organizers";
import type { Organizer } from "@/types/organizer";
import type { OrganizerCreateFormData } from "@/lib/validations/organizer.schema";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";
import Link from "next/link";
import { getGoogleDriveImageUrl } from "@/lib/utils/image";

export default function AdminOrganizersPage() {
  const [organizers, setOrganizers] = useState<Organizer[]>([]);
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

  const fetchOrganizers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await organizersApi.getAll(page, 20);

      if (response.success && response.data) {
        setOrganizers(response.data);
        setPagination(
          response.meta || {
            total: 0,
            totalPages: 0,
            limit: 20,
          },
        );
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch organizers");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizers();
  }, [page]);

  const filteredOrganizers = organizers.filter(
    (organizer) =>
      organizer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      organizer.slug.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleCreateOrganizer = async (data: OrganizerCreateFormData) => {
    setIsCreating(true);
    try {
      const response = await organizersApi.create(data);
      await fetchOrganizers();
      return response;
    } catch (err: any) {
      toast.error(err.message || "Failed to create organizer");
      throw err;
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteOrganizer = async (organizerId: string) => {
    if (!confirm("Are you sure you want to delete this organizer?")) {
      return;
    }

    try {
      const res: any = await organizersApi.delete(organizerId);
      if (res.success) {
        toast.success(res.message || "Organizer deleted successfully");
        await fetchOrganizers();
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to delete organizer");
    }
  };

  const handleToggleVerification = async (
    organizerId: string,
    currentStatus: boolean,
  ) => {
    try {
      await organizersApi.update(organizerId, { isVerified: !currentStatus });
      toast.success(
        `Organizer ${!currentStatus ? "verified" : "unverified"} successfully`,
      );
      await fetchOrganizers();
    } catch (err: any) {
      toast.error(err.message || "Failed to update organizer verification");
    }
  };

  if (isLoading && organizers.length === 0) {
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
          <h1 className="text-xl sm:text-2xl font-bold">Organizer Management</h1>

          <Breadcrumb
            items={[{ label: "Admin", href: "/admin" }, { label: "Organizers" }]}
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
                  placeholder="Search organizers..."
                  className="pl-10 h-10 sm:h-auto"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <Button onClick={() => setIsAddDialogOpen(true)} className="w-full sm:w-auto">
              <Building2 className="h-4 w-4 mr-1 sm:mr-2" />
              <span>Add Organizer</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          {/* Mobile Card View */}
          <div className="md:hidden space-y-3 sm:space-y-4">
            {filteredOrganizers.map((organizer, index) => (
              <motion.div
                key={organizer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                    <Avatar className="h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0">
                      <AvatarFallback className="text-xs sm:text-sm">
                        {getInitials(organizer.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm sm:text-base truncate">
                        {organizer.name}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground truncate">
                        {organizer.totalEvents} events
                      </p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="flex-shrink-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="min-w-[160px]">
                      <DropdownMenuItem asChild className="cursor-pointer">
                        <Link href={`/organizers/${organizer.slug}`}>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Organizer
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() =>
                          handleToggleVerification(organizer.id, organizer.isVerified)
                        }
                      >
                        <Shield className="h-4 w-4 mr-2" />
                        {organizer.isVerified ? "Unverify" : "Verify"}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive cursor-pointer"
                        onClick={() => handleDeleteOrganizer(organizer.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Organizer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  <Badge variant="outline" className="text-xs">
                    ⭐ {organizer.rating}
                  </Badge>
                  <Badge
                    variant={organizer.isVerified ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {organizer.isVerified ? "Verified" : "Unverified"}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {formatDate(new Date(organizer.createdAt))}
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
                  <th className="text-left pb-3 font-medium">Events</th>
                  <th className="text-left pb-3 font-medium">Rating</th>
                  <th className="text-left pb-3 font-medium">Status</th>
                  <th className="text-left pb-3 font-medium">Joined</th>
                  <th className="text-right pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrganizers.map((organizer, index) => (
                  <motion.tr
                    key={organizer.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b last:border-0 hover:bg-muted/50"
                  >
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {getInitials(organizer.name)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{organizer.name}</span>
                      </div>
                    </td>
                    <td className="py-3 text-muted-foreground">
                      {organizer.totalEvents} events
                    </td>
                    <td className="py-3">
                      <Badge variant="outline">⭐ {organizer.rating}</Badge>
                    </td>
                    <td className="py-3">
                      <Badge
                        variant={organizer.isVerified ? "default" : "secondary"}
                      >
                        {organizer.isVerified ? "Verified" : "Unverified"}
                      </Badge>
                    </td>
                    <td className="py-3 text-muted-foreground">
                      {formatDate(new Date(organizer.createdAt))}
                    </td>
                    <td className="py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild className="cursor-pointer">
                            <Link href={`/organizers/${organizer.slug}`}>
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View Profile
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Organizer
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() =>
                              handleToggleVerification(organizer.id, organizer.isVerified)
                            }
                          >
                            <Shield className="h-4 w-4 mr-2" />
                            {organizer.isVerified ? "Unverify" : "Verify"}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive cursor-pointer"
                            onClick={() => handleDeleteOrganizer(organizer.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Organizer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>

            {filteredOrganizers.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No organizers found
              </div>
            )}
          </div>

          {pagination.totalPages > 1 && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4 sm:mt-6 pt-4 border-t">
              <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
                Page {page} of {pagination.totalPages} ({pagination.total} organizers)
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

      {/* Add Organizer Dialog */}
      <AddOrganizerDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleCreateOrganizer}
        isLoading={isCreating}
      />
    </div>
  );
}
