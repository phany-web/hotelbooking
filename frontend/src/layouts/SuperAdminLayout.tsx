import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";

interface Props {
  children: React.ReactNode;
}

const SuperAdminLayout = ({ children }: Props) => {
  return (
    <div className="flex">
      <Sidebar role="SUPER_ADMIN" />

      <div className="flex-1 bg-slate-100 min-h-screen">
        <Topbar />
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default SuperAdminLayout;
