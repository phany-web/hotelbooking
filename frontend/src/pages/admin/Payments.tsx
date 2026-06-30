import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

const Payments = () => {
  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState<any[]>([]);

  useEffect(() => {
    // mock for now (replace with API later)
    setTimeout(() => {
      setPayments([
        {
          id: "1",
          customer: "John Doe",
          amount: 120,
          method: "KHQR",
          status: "PAID",
          date: "2026-06-29",
        },
        {
          id: "2",
          customer: "Anna Smith",
          amount: 250,
          method: "CASH",
          status: "PENDING",
          date: "2026-06-28",
        },
      ]);

      setLoading(false);
    }, 500);
  }, []);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "PAID":
        return "bg-green-50 text-green-700";
      case "PENDING":
        return "bg-yellow-50 text-yellow-700";
      case "FAILED":
        return "bg-red-50 text-red-700";
      default:
        return "bg-slate-50 text-slate-700";
    }
  };

  const totalRevenue = payments
    .filter((p) => p.status === "PAID")
    .reduce((sum, p) => sum + p.amount, 0);

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-10 text-center text-slate-500">
          Loading payments...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800">
            Payments & Revenue
          </h1>
          <p className="text-slate-500 text-sm">
            Track hotel income, transactions & payment status
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-sm p-4">
            <p className="text-slate-500 text-sm">Total Revenue</p>
            <h2 className="text-2xl font-bold text-green-600">
              ${totalRevenue}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-4">
            <p className="text-slate-500 text-sm">Total Transactions</p>
            <h2 className="text-2xl font-bold text-slate-800">
              {payments.length}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-4">
            <p className="text-slate-500 text-sm">Pending Payments</p>
            <h2 className="text-2xl font-bold text-yellow-600">
              {payments.filter((p) => p.status === "PENDING").length}
            </h2>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="p-4 text-left">Customer</th>
                <th className="p-4 text-left">Amount</th>
                <th className="p-4 text-left">Method</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((p, index) => (
                <tr
                  key={p.id}
                  className={`
                    hover:bg-slate-50 transition
                    ${index !== payments.length - 1 ? "border-b border-slate-100" : ""}
                  `}
                >
                  <td className="p-4 font-medium text-slate-800">
                    {p.customer}
                  </td>

                  <td className="p-4 font-semibold text-slate-800">
                    ${p.amount}
                  </td>

                  <td className="p-4 text-slate-600">{p.method}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                        p.status
                      )}`}
                    >
                      {p.status}
                    </span>
                  </td>

                  <td className="p-4 text-slate-600">{p.date}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {payments.length === 0 && (
            <div className="text-center py-10 text-slate-400">
              No payments found
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Payments;