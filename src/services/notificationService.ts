
import { apiService } from "./apiService";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  createdAt: string;
  isRead: boolean;
  relatedId?: string;
  relatedType?: string;
}

export const notificationService = {
  getNotifications: () => apiService.get("/notifications"),
  
  markAsRead: (id: string) => apiService.put(`/notifications/${id}/read`, {}),
  
  markAllAsRead: () => apiService.put("/notifications/read-all", {}),
  
  deleteNotification: (id: string) => apiService.delete(`/notifications/${id}`),
  
  subscribeToNotifications: (callback: (notification: Notification) => void) => {
    // In a real app, this would be implemented with WebSockets or Server-Sent Events
    // For now, we'll just poll the API every 30 seconds
    const intervalId = setInterval(async () => {
      try {
        const notifications = await apiService.get("/notifications?unread=true");
        if (notifications && notifications.length > 0) {
          notifications.forEach(callback);
        }
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    }, 30000);
    
    return () => clearInterval(intervalId);
  }
};
