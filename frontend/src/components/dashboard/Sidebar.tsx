import { Link, useLocation } from "react-router-dom";

import {
  LayoutDashboard,
  Building2,
  Users,
  BedDouble,
  CalendarDays,
  CreditCard,
  Star,
  FileBarChart,
  ClipboardList,
  Bell,
} from "lucide-react";

interface SidebarProps {
  role: string;
}

const Sidebar = ({ role }: SidebarProps) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const adminMenus = [
    {
      label: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
    },

    {
      label: "Hotels",
      path: "/admin/hotels",
      icon: Building2,
    },

    {
      label: "Staff",
      path: "/admin/staff",
      icon: Users,
    },

    {
      label: "Room Types",
      path: "/admin/room-types",
      icon: BedDouble,
    },

    {
      label: "Rooms",
      path: "/admin/rooms",
      icon: BedDouble,
    },

    {
      label: "Bookings",
      path: "/admin/bookings",
      icon: CalendarDays,
    },

    {
      label: "Payments",
      path: "/admin/payments",
      icon: CreditCard,
    },

    {
      label: "Tasks",
      path: "/admin/tasks",
      icon: ClipboardList,
    },

    {
      label: "Reviews",
      path: "/admin/reviews",
      icon: Star,
    },

    {
      label: "Notifications",
      path: "/admin/notifications",
      icon: Bell,
    },

    {
      label: "Reports",
      path: "/admin/reports",
      icon: FileBarChart,
    },
  ];

  const superAdminMenus = [
    {
      label: "Dashboard",
      path: "/super-admin",
      icon: LayoutDashboard,
    },

    {
      label: "Hotels",
      path: "/super-admin/hotels",
      icon: Building2,
    },

    {
      label: "Admins",
      path: "/super-admin/admins",
      icon: Users,
    },

    {
      label: "Users",
      path: "/super-admin/users",
      icon: Users,
    },

    {
      label: "Bookings",
      path: "/super-admin/bookings",
      icon: CalendarDays,
    },

    {
      label: "Reviews",
      path: "/super-admin/reviews",
      icon: Star,
    },

    {
      label: "Reports",
      path: "/super-admin/reports",
      icon: FileBarChart,
    },
  ];

  const menus = role === "SUPER_ADMIN" ? superAdminMenus : adminMenus;

  return (
    <aside
      className="
      w-72
      min-h-screen
      bg-slate-950
      border-r
      border-slate-800
      text-white
      flex
      flex-col
      "
    >
      <div
        className="
        h-20
        flex
        items-center
        px-6
        border-b
        border-slate-800
        "
      >
        <div>
          <h1 className="text-2xl font-bold">Hotel PMS</h1>

          <p className="text-xs text-slate-400">Management System</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <Link
              key={menu.path}
              to={menu.path}
              className={`
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-xl
                transition-all
                duration-200

                ${
                  isActive(menu.path)
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }
              `}
            >
              <Icon size={18} />

              <span>{menu.label}</span>
            </Link>
          );
        })}
      </nav>

      <div
        className="
        p-4
        border-t
        border-slate-800
        "
      >
        <div
          className="
          bg-slate-900
          rounded-xl
          p-4
          "
        >
          <p className="text-sm text-slate-400">Hotel PMS v1.0</p>

          <p className="text-xs text-slate-500 mt-1">Modern Hotel Management</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
