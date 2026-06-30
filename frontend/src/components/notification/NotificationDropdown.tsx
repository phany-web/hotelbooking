import { useEffect, useState } from "react";
import { getMyNotifications } from "../../services/notification.service";
import { useAuthStore } from "../../store/auth.store";

const NotificationDropdown = () => {
  const { token } = useAuthStore();
  const [notifications, setNotifications] = useState([]);

  const loadNotifications = async () => {
    try {
      const data = await getMyNotifications();
      setNotifications(data);
    } catch (err) {
      console.log("Notification error:", err);
    }
  };

  useEffect(() => {
    if (!token) return; // 🔥 IMPORTANT FIX

    loadNotifications();
  }, [token]);

  return (
    <div>
      <h3>Notifications</h3>

      {notifications.length === 0 ? (
        <p>No notifications</p>
      ) : (
        notifications.map((n: any) => (
          <div key={n.id}>{n.title}</div>
        ))
      )}
    </div>
  );
};

export default NotificationDropdown;