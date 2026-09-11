import React, { useState, useEffect } from "react";
import axios from "axios";

export default function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  // Fetch notifications on component mount and poll for new ones
  useEffect(() => {
    if (!token) return;

    const fetchNotifications = async () => {
      try {
        const response = await axios.get("/api/notifications", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotifications(response.data);

        const unread = response.data.filter((n) => !n.read).length;
        setUnreadCount(unread);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    fetchNotifications();

    // Poll for new notifications every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);

    return () => clearInterval(interval);
  }, [token]);

  const handleMarkAsRead = async (notificationId) => {
    try {
      await axios.patch(
        `/api/notifications/${notificationId}/read`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const handleDelete = async (notificationId) => {
    try {
      await axios.delete(`/api/notifications/${notificationId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
    } catch (error) {
      console.error("Failed to delete notification:", error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await axios.patch(
        "/api/notifications/all/read",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error("Failed to mark all as read:", error);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "booking_confirmed":
        return "✓";
      case "cancellation_approved":
        return "✓";
      case "cancellation_rejected":
        return "✗";
      case "cancellation_request":
        return "?";
      case "review_reported":
        return "!";
      case "new_review":
        return "★";
      default:
        return "●";
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case "booking_confirmed":
      case "cancellation_approved":
        return "bg-green-50 border-green-200";
      case "cancellation_rejected":
      case "review_reported":
        return "bg-red-50 border-red-200";
      case "cancellation_request":
        return "bg-blue-50 border-blue-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  if (!token) return null;

  return (
    <div className="relative">
      {/* Notification Bell Button */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors"
        title="Notifications"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>

        {/* Unread Badge */}
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium"
              >
                Mark all as read
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="overflow-y-auto flex-1">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <p>No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    !notification.read ? getNotificationColor(notification.type) : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-start gap-2">
                        <span className="text-lg mt-0.5">
                          {getNotificationIcon(notification.type)}
                        </span>
                        <div>
                          <p className="font-medium text-gray-900">
                            {notification.title}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-2">
                            {new Date(
                              notification.createdAt
                            ).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {!notification.read && (
                        <button
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="text-blue-600 hover:text-blue-700 text-xs font-medium"
                          title="Mark as read"
                        >
                          ✓
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(notification.id)}
                        className="text-gray-400 hover:text-red-500 text-lg leading-none"
                        title="Delete"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-4 border-t border-gray-200 text-center">
              <button
                onClick={() => {
                  setShowDropdown(false);
                }}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                View all notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
