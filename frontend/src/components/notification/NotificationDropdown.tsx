import { useEffect, useState } from "react";

import { Bell } from "lucide-react";

import {
  getMyNotifications,
  getUnreadCount,
  markNotificationRead,
  markAllRead,
} from "../../services/notification.service";

const NotificationDropdown = () => {
  const [open, setOpen] = useState(false);

  const [notifications, setNotifications] = useState<any[]>([]);

  const [count, setCount] = useState(0);

  const loadNotifications = async () => {
    const data = await getMyNotifications();

    const unread = await getUnreadCount();

    setNotifications(data);

    setCount(unread);
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleRead = async (id: string) => {
    await markNotificationRead(id);

    loadNotifications();
  };

  const handleReadAll = async () => {
    await markAllRead();

    loadNotifications();
  };

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="relative">
        <Bell size={24} />

        {count > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
            {count}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-lg z-50">
          <div className="flex justify-between p-4 border-b">
            <h3 className="font-bold">Notifications</h3>

            <button onClick={handleReadAll} className="text-blue-600 text-sm">
              Read All
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border-b cursor-pointer ${
                  !notification.isRead ? "bg-blue-50" : ""
                }`}
                onClick={() => handleRead(notification.id)}
              >
                <h4 className="font-semibold">{notification.title}</h4>

                <p className="text-sm text-gray-600">{notification.message}</p>
              </div>
            ))}

            {notifications.length === 0 && (
              <div className="p-6 text-center text-gray-500">
                No Notifications
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
