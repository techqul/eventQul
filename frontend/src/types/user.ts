export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "user" | "organizer" | "admin";
  joinedDate: Date;
  phone?: string;
  location?: string;
  bio?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "event_reminder" | "ticket";
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
}
