
import React, { useState, useEffect } from "react";
import { Bell, Check, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { notificationService, Notification } from "@/services/notificationService";
import { useApi } from "@/hooks/useApi";
import { useToast } from "@/hooks/use-toast";

const NotificationDropdown: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { useGet, usePut, useDelete } = useApi();
  const { toast } = useToast();

  const { data, refetch } = useGet(
    ["notifications"],
    notificationService.getNotifications,
    {
      onSuccess: (data) => {
        setNotifications(data || []);
      },
    }
  );

  const markAsRead = usePut(notificationService.markAsRead, {
    invalidateQueries: ["notifications"],
  });

  const markAllAsRead = usePut(notificationService.markAllAsRead, {
    invalidateQueries: ["notifications"],
    successMessage: "All notifications marked as read",
  });

  const deleteNotification = useDelete(notificationService.deleteNotification, {
    invalidateQueries: ["notifications"],
  });

  useEffect(() => {
    // Subscribe to new notifications
    const unsubscribe = notificationService.subscribeToNotifications((notification) => {
      setNotifications((prev) => [notification, ...prev]);
      toast({
        title: notification.title,
        description: notification.message,
      });
    });

    return () => {
      unsubscribe();
    };
  }, [toast]);

  const handleMarkAsRead = (id: string) => {
    markAsRead.mutate(id);
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead.mutate();
  };

  const handleDeleteNotification = (id: string) => {
    deleteNotification.mutate(id);
  };

  const unreadCount = notifications?.filter((n) => !n.isRead).length || 0;

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs"
              onClick={handleMarkAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-[300px] overflow-y-auto">
          <DropdownMenuGroup>
            {notifications && notifications.length > 0 ? (
              notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className={`p-3 cursor-default ${
                    !notification.isRead ? "bg-muted/50" : ""
                  }`}
                >
                  <div className="flex flex-col w-full">
                    <div className="flex justify-between items-start">
                      <span className="font-medium">{notification.title}</span>
                      <div className="flex items-center gap-1">
                        {!notification.isRead && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => handleMarkAsRead(notification.id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-red-500"
                          onClick={() => handleDeleteNotification(notification.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {notification.message}
                    </p>
                    <span className="text-xs text-muted-foreground mt-1">
                      {new Date(notification.createdAt).toLocaleString()}
                    </span>
                  </div>
                </DropdownMenuItem>
              ))
            ) : (
              <div className="py-6 text-center text-muted-foreground">
                No notifications to display
              </div>
            )}
          </DropdownMenuGroup>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;
