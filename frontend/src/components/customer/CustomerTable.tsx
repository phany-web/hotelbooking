interface Props {
  customers: any[];
}

const CustomerTable = ({ customers }: Props) => {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      {" "}
      <table className="w-full">
        {" "}
        <thead className="bg-gray-100">
          {" "}
          <tr>
            {" "}
            <th className="p-4 text-left">Name </th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Phone</th>
            <th className="p-4 text-left">Total Bookings</th>
            <th className="p-4 text-left">Total Spent</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id} className="border-b">
              <td className="p-4">{customer.fullName}</td>

              <td className="p-4">{customer.email}</td>

              <td className="p-4">{customer.phone}</td>

              <td className="p-4">{customer.totalBookings}</td>

              <td className="p-4">${customer.totalSpent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;
