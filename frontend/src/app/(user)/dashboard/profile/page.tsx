"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function UserProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 sm:mb-8"
      >
        <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Profile</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </motion.div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="mb-4 sm:mb-6 w-full sm:w-auto overflow-x-auto flex-nowrap">
          <TabsTrigger value="personal" className="flex-1 sm:flex-none">Personal Info</TabsTrigger>
          <TabsTrigger value="security" className="flex-1 sm:flex-none">Security</TabsTrigger>
          <TabsTrigger value="preferences" className="flex-1 sm:flex-none">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader className="pb-4 sm:pb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <CardTitle className="text-lg sm:text-xl">Personal Information</CardTitle>
                <Button
                  variant={isEditing ? "default" : "outline"}
                  size={isEditing ? "default" : "sm"}
                  onClick={() => setIsEditing(!isEditing)}
                  className="w-full sm:w-auto"
                >
                  {isEditing ? "Cancel" : "Edit Profile"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center gap-3 sm:gap-4">
                <Avatar className="h-16 w-16 sm:h-20 sm:w-20">
                  <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop" />
                  <AvatarFallback>AR</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Button variant="outline" size="sm" disabled={!isEditing} className="mb-1 sm:mb-2">
                    <Camera className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                    Change Photo
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    JPG, PNG or GIF. Max 5MB.
                  </p>
                </div>
              </div>

              <Separator />

              {/* Form Fields */}
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm">First Name</Label>
                  <Input
                    id="firstName"
                    defaultValue="Ahmed"
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm">Last Name</Label>
                  <Input
                    id="lastName"
                    defaultValue="Rahman"
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="ahmed@example.com"
                  disabled
                />
                <p className="text-xs text-muted-foreground">
                  Email cannot be changed
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm">Phone Number</Label>
                <Input
                  id="phone"
                  defaultValue="+880 1712-345678"
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm">Location</Label>
                <Input
                  id="location"
                  defaultValue="Dhaka, Bangladesh"
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="text-sm">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself..."
                  defaultValue="Tech enthusiast and event lover"
                  disabled={!isEditing}
                  rows={3}
                />
              </div>

              {isEditing && (
                <div className="flex gap-2 sm:gap-3 pt-2 sm:pt-4">
                  <Button className="flex-1 sm:flex-none">Save Changes</Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)} className="flex-1 sm:flex-none">
                    Cancel
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader className="pb-4 sm:pb-6">
              <CardTitle className="text-lg sm:text-xl">Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              <div>
                <h3 className="font-medium mb-3 sm:mb-4">Change Password</h3>
                <div className="space-y-3 sm:space-y-4 max-w-md">
                  <div className="space-y-2">
                    <Label htmlFor="current" className="text-sm">Current Password</Label>
                    <Input id="current" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new" className="text-sm">New Password</Label>
                    <Input id="new" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm" className="text-sm">Confirm New Password</Label>
                    <Input id="confirm" type="password" />
                  </div>
                  <Button className="w-full sm:w-auto">Update Password</Button>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-3 sm:mb-4">Two-Factor Authentication</h3>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 max-w-md">
                  <div>
                    <p className="font-medium text-sm">Enable 2FA</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Button variant="outline" className="w-full sm:w-auto">Enable</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader className="pb-4 sm:pb-6">
              <CardTitle className="text-lg sm:text-xl">Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              <div>
                <h3 className="font-medium mb-3 sm:mb-4">Notifications</h3>
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 rounded-lg border">
                    <div className="flex-1">
                      <p className="font-medium text-sm">Email Notifications</p>
                      <p className="text-xs text-muted-foreground">
                        Receive updates about your events
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="w-full sm:w-auto mt-2 sm:mt-0">
                      Enabled
                    </Button>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 rounded-lg border">
                    <div className="flex-1">
                      <p className="font-medium text-sm">SMS Notifications</p>
                      <p className="text-xs text-muted-foreground">
                        Get text alerts for important updates
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="w-full sm:w-auto mt-2 sm:mt-0">
                      Disabled
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-3 sm:mb-4">Language & Region</h3>
                <div className="grid max-w-md gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="language" className="text-sm">Language</Label>
                    <select
                      id="language"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="en">English</option>
                      <option value="bn">বাংলা (Bengali)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone" className="text-sm">Timezone</Label>
                    <select
                      id="timezone"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="Asia/Dhaka">Asia/Dhaka (GMT+6)</option>
                      <option value="UTC">UTC (GMT+0)</option>
                    </select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
