import AdminLayout from "../../layouts/AdminLayout";

const notifications = [
  {
    id: 1,
    type: "booking",
    title: "New Booking Received",
    message: "Room A101 has been booked by John Doe.",
    time: "5 minutes ago",
    unread: true,
  },
  {
    id: 2,
    type: "payment",
    title: "Payment Completed",
    message: "Booking #BK-1023 payment was successful.",
    time: "20 minutes ago",
    unread: true,
  },
  {
    id: 3,
    type: "review",
    title: "New Customer Review",
    message: "A guest rated your hotel 5 stars.",
    time: "2 hours ago",
    unread: false,
  },
  {
    id: 4,
    type: "task",
    title: "Cleaning Task Completed",
    message: "Room B203 cleaning has been completed.",
    time: "4 hours ago",
    unread: false,
  },
];

const Notifications = () => {
  const unreadCount = notifications.filter(
    (n) => n.unread
  ).length;

  const getIcon = (type: string) => {
    switch (type) {
      case "booking":
        return "🏨";

      case "payment":
        return "💳";

      case "review":
        return "⭐";

      case "task":
        return "🧹";

      default:
        return "🔔";
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Notifications
            </h1>

            <p className="text-slate-500 mt-1">
              Stay updated with hotel activities
            </p>
          </div>

          <button
            className="
              px-4 py-2
              bg-blue-600
              text-white
              rounded-xl
              hover:bg-blue-700
              transition
            "
          >
            Mark All Read
          </button>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-5">
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <p className="text-slate-500 text-sm">
              Total Notifications
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {notifications.length}
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <p className="text-slate-500 text-sm">
              Unread
            </p>

            <h2 className="text-3xl font-bold mt-2 text-red-600">
              {unreadCount}
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <p className="text-slate-500 text-sm">
              Read
            </p>

            <h2 className="text-3xl font-bold mt-2 text-green-600">
              {notifications.length - unreadCount}
            </h2>
          </div>
        </div>

        {/* NOTIFICATION LIST */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-5 border-b">
            <h2 className="font-semibold text-lg">
              Recent Notifications
            </h2>
          </div>

          <div>
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`
                  flex items-start gap-4
                  p-5 border-b
                  hover:bg-slate-50
                  transition
                  ${
                    notification.unread
                      ? "bg-blue-50/40"
                      : ""
                  }
                `}
              >
                <div className="text-3xl">
                  {getIcon(notification.type)}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-semibold text-slate-800">
                      {notification.title}
                    </h3>

                    <span className="text-xs text-slate-400">
                      {notification.time}
                    </span>
                  </div>

                  <p className="text-slate-600 mt-1">
                    {notification.message}
                  </p>
                </div>

                {notification.unread && (
                  <div className="w-3 h-3 rounded-full bg-blue-600 mt-2"></div>
                )}
              </div>
            ))}
          </div>

          {notifications.length === 0 && (
            <div className="py-16 text-center">
              <div className="text-6xl mb-4">
                🔔
              </div>

              <h3 className="font-semibold text-lg">
                No Notifications
              </h3>

              <p className="text-slate-500 mt-1">
                New notifications will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Notifications;